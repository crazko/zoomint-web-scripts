import { Command } from '@oclif/command';
import * as execa from 'execa';
import { cosmiconfigSync } from 'cosmiconfig';
import { CONSUMING_ROOT, PRETTIER_CONFIG } from '../paths';

export class Format extends Command {
  static description = 'Format code using Prettier';

  static strict = false;

  async run() {
    const { argv } = this.parse(Format);

    const explorer = cosmiconfigSync('prettier', { stopDir: CONSUMING_ROOT });
    let configResult = explorer.search();

    if (configResult === null) {
      configResult = explorer.load(PRETTIER_CONFIG);
    }

    if (configResult) {
      const config = configResult.filepath;
      const userInputArguments = argv.join(' ');

      const command = `npx --no-install prettier --ignore-path .gitignore --write --config ${config} ${userInputArguments} **/*.{js,jsx,ts,tsx,json,css,scss}`;

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
