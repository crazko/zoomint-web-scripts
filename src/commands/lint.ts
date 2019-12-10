import { Command, flags } from '@oclif/command';
import { hasConfig } from '@spotify/web-scripts-utils';
import * as execa from 'execa';
import { cosmiconfigSync } from 'cosmiconfig';
import { ESLINT_CONFIG, CONSUMING_ROOT } from '../paths';

export default class Lint extends Command {
  static description = 'Run ESlint';

  // static flags = {
  //   help: flags.help({char: 'h'}),
  //   // flag with a value (-n, --name=VALUE)
  //   name: flags.string({char: 'n', description: 'name to print'}),
  //   // flag with no value (-f, --force)
  //   force: flags.boolean({char: 'f'}),
  // }

  // static args = [{ name: "file" }];

  // this makes the parser not fail when it receives invalid arguments
  static strict = false;

  async run() {
    const { argv, args, flags } = this.parse(Lint);

    const explorer = cosmiconfigSync('eslint', { stopDir: process.cwd() });
    let result = explorer.search();

    if (result === null) {
      result = explorer.load(ESLINT_CONFIG);
    }

    if (result) {
      const config = result.filepath;
      const s = argv.join(' ');

      // if (args.file && flags.force) {
      // this.log(`you input --force and --file: ${args.file}`);
      // }
      try {
        const foo = await execa.command(
          `npx --no-install eslint ${s} ${CONSUMING_ROOT}`,
          { env: { FORCE_COLOR: 'true' } }
          // {stdio: 'inherit',}
        );
        this.log(foo.stdout);
      } catch ({ stdout, stderr, exitCode }) {
        if (stderr) {
          this.error(stderr, { code: exitCode });
        } else {
          this.log(stdout);
          this.exit(exitCode);
        }
      }
    }
  }
}
