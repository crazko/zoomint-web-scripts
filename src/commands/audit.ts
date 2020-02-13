import * as fs from 'fs';
import { Command, flags as commandFlags } from '@oclif/command';
import * as execa from 'execa';
import { cosmiconfigSync } from 'cosmiconfig';
import { CONSUMING_ROOT, WEB_SCRIPTS_CONFIG } from '../paths';

/**
 * @return report file destination
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createReport = (stdout: any, path: string, name: string) => {
  const title = 'Vulnerabilities Report';

  const getInfoRows = (data: Record<string, number>) =>
    Object.entries(data)
      .map(([level, number]) => `<tr><th scope="row">${level}</th><td>${number}</td></tr>`)
      .join('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatAdvisories = (data: Record<string, any>) =>
    Object.values(data)
      .map(
        (item) => `<table>
    <caption>${item.module_name}</caption>
    <tr><td colspan="2">${item.overview}</td></tr>
    <tr><th scope="row">type:</th><td>${item.title}, <strong>${item.severity}</strong></td></tr>
    <tr><th scope="row">recommendation:</th><td>${item.recommendation}</td></tr>
    <tr><th scope="row">vulnerable versions:</th><td><samp>${item.vulnerable_versions}</samp></td></tr>
    <tr><th scope="row">patched versions:</th><td><samp>${item.patched_versions}</samp></td></tr>
    <tr><th scope="row">paths:</th><td><ul>${item.findings
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((finding: any) => `<li>${finding.paths.join(', ')}</li>`)
      .join('')}</ul></td></tr>
    <tr><td colspan="2"><a href="${item.url}" target="_blank">${item.url}</a></t></tr>
  </table>`
      )
      .join('');

  const output = `<html lang="en">
  <head>
    <title>${title}</title>
    <style>
      table {
        border-collapse: collapse;
        margin-bottom: 3em;
      }
      td, th {
          border: 1px solid black;
          padding: 1ch;
      }
      caption {
        font-size: 2em;
      }
      ul {
        margin: 0;
      }
  </style>
  </head>
  <body>
    <h1>${title}</h1>
    <p>This report contains vulnerabilities found with <code>npm audit</code> command. Resulted findings <em>may</em> or <em>may not</em> affect the project directly, do read the overview and instructions carefully.</p>
    <table>
      <caption>Info</caption>
      <thead>
        <tr><th>level</th><th>number</th></tr>
      </thead>
      ${getInfoRows(stdout.metadata.vulnerabilities)}
    </table>
    ${formatAdvisories(stdout.advisories)}
  </body>
</html>`;

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }

  const filePath = `${path}/${name}.html`;

  fs.writeFileSync(filePath, output);

  return filePath;
};

export class Audit extends Command {
  static description = 'Report vulnerabilities';

  static flags = {
    report: commandFlags.boolean({ char: 'r', helpLabel: '--report, -r', description: 'Generates HTML report.' }),
  };

  async run() {
    const { flags } = this.parse(Audit);
    const { report } = flags;

    const explorer = cosmiconfigSync('web-scripts', { stopDir: CONSUMING_ROOT });
    let configResult = explorer.search();

    if (configResult === null) {
      configResult = explorer.load(WEB_SCRIPTS_CONFIG);
    }

    if (configResult) {
      const { auditFilename, auditLevel, testResultsDestination } = configResult.config;

      const command = ['npm audit', ...(report ? ['--json'] : []), `--audit-level=${auditLevel}`].join(' ');

      this.log(command);

      try {
        await execa.command(command);
        this.log('No vulnerabilities found');
      } catch ({ exitCode, stdout }) {
        if (report) {
          const filePath = createReport(JSON.parse(stdout), testResultsDestination, auditFilename);

          this.error(`Vulnerabilities found. Report generated at ${filePath}`, {
            exit: exitCode,
          });
        }

        this.log(stdout);
        this.exit(exitCode);
      }
    }
  }
}
