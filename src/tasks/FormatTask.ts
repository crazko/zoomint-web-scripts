import { default as Debug } from 'debug';
import { default as spawn } from 'cross-spawn';
import { SpawnSyncReturns } from 'child_process';
import { hasConfig } from '@spotify/web-scripts-utils';

import { FormatTaskDesc } from '../types';
import { PRETTIER_CONFIG } from '../paths';

const dbg = Debug('web-scripts:format'); // eslint-disable-line new-cap

export function getPrettierConfig(): string | null {
  if (
    !hasConfig([
      { type: 'file', pattern: '.prettierrc' },
      { type: 'file', pattern: 'prettier.config.js' },
      { type: 'package.json', property: 'prettierrc' },
    ])
  ) {
    return PRETTIER_CONFIG;
  }

  return null;
}

export function formatTask(task: FormatTaskDesc): SpawnSyncReturns<Buffer> {
  const cmd = 'npx';
  const config = task.config || getPrettierConfig();

  const args = ['--no-install', 'prettier', ...(config ? ['--config', config] : []), ...task.restOptions];
  dbg('npx args %o', args);
  return spawn.sync(cmd, args, { stdio: 'inherit' });
}
