import { Command } from '@oclif/command';
import * as execa from 'execa';
import { cosmiconfigSync } from 'cosmiconfig';
import { ESLINT_CONFIG, CONSUMING_ROOT } from '../paths';

export default class Lint extends Command {
  static description = 'Run ESlint';

  static strict = false;

  async run() {
    const { argv } = this.parse(Lint);

    const explorer = cosmiconfigSync('eslint', { stopDir: CONSUMING_ROOT });
    let configResult = explorer.search();

    if (configResult === null) {
      configResult = explorer.load(ESLINT_CONFIG);
    }

    if (configResult) {
      const config = configResult.filepath;
      const userInputArguments = argv.join(' ');

      const command = `npx --no-install eslint ${CONSUMING_ROOT} --ext js,ts,jsx,tsx --config ${config} ${userInputArguments}`;

      this.log(command);

      try {
        const subprocess = await execa.command(
          command,
          // { env: { FORCE_COLOR: 'true' } }
          { stdio: 'inherit' }
        );
        this.log(subprocess.stdout);
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
