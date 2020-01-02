import { Command } from '@oclif/command';
import * as execa from 'execa';
import { cosmiconfigSync } from 'cosmiconfig';
import { CONSUMING_ROOT, JEST_CONFIG } from '../paths';

export default class Test extends Command {
  static description = 'Run Jest';

  static strict = false;

  async run() {
    const { argv } = this.parse(Test);

    const explorer = cosmiconfigSync('jest', { stopDir: CONSUMING_ROOT });
    let configResult = explorer.search();

    if (configResult === null) {
      configResult = explorer.load(JEST_CONFIG);
    }

    if (configResult) {
      const config = configResult.filepath;
      const userInputArguments = argv.join(' ');

      const command = `npx --no-install jest --config ${config} ${userInputArguments}`;

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
