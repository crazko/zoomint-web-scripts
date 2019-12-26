import { Command } from '@oclif/command';
import * as execa from 'execa';

export default class Audit extends Command {
  static description = 'Report vulnerabilities';

  async run() {
    const command = `npm audit --audit-level=critical`;

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
