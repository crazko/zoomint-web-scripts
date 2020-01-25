import { join, resolve } from 'path';

export const CONSUMING_ROOT = resolve(process.cwd());

export const CONFIGS_FOLDER = join(__dirname, 'configs');

export const WEB_SCRIPTS_CONFIG = join(CONFIGS_FOLDER, 'web-scripts.config.js');
export const ESLINT_CONFIG = join(CONFIGS_FOLDER, 'eslintrc.js');
export const JEST_CONFIG = join(CONFIGS_FOLDER, 'jest.config.js');
export const PRETTIER_CONFIG = join(CONFIGS_FOLDER, 'prettier.config.js');
