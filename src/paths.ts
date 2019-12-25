import { join, resolve } from 'path';

export const CONSUMING_ROOT = resolve(process.cwd());

export const CONFIGS_FOLDER = join(__dirname, 'configs');
export const ESLINT_CONFIG = join(CONFIGS_FOLDER, 'eslintrc.js');
