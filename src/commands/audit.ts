import * as fs from 'fs';
import { Command, flags } from '@oclif/command';
import * as execa from 'execa';

export default class Audit extends Command {
  static description = 'Report vulnerabilities';

  static flags = {
    report: flags.boolean({ char: 'r', helpLabel: '--report, -r', description: 'Generates HTML report.' }),
  };

  async run() {
    const { flags } = this.parse(Audit);
    const report = flags.report;

    const command = ['npm audit', ...(report ? ['--json'] : []), '--audit-level=low'].join(' ');

    this.log(command);

    try {
      await execa.command(command);
      this.log('No vulnerabilities found');
    } catch ({ exitCode, stdout }) {
      if (report) {
        const filePath = createReport(stdout);

        this.error(`Vulnerabilities found. Report generated at ${filePath}`, {
          exit: exitCode,
        });
      }

      this.log(stdout);
      this.exit(exitCode);
    }
  }
}

/**
 * @return report file destination
 */
const createReport = (stdout: string, path = './test-results') => {
  const title = 'Vulnerabilities Report';
  const output = `<html lang="en">
  <head>
    <title>${title}</title>
    <style>html { font-family: monospace }</style>
  </head>
  <body>
    <h1>${title}</h1>
    <pre>${stdout}</pre>
  </body>
</html>`;

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }

  const filePath = `${path}/reports-audit.html`;

  fs.writeFileSync(filePath, output);

  return filePath;
};
