import { join } from 'path';
import { getConsumingRoot } from '@spotify/web-scripts-utils';
// export const THIS_ROOT = join(__dirname, '..');

export const CONSUMING_ROOT = getConsumingRoot();

export const CONFIGS_FOLDER = join(__dirname, 'configs');
export const ESLINT_CONFIG = join(CONFIGS_FOLDER, 'eslintrc.js');
