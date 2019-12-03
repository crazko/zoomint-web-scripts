import builtins from 'rollup-plugin-node-builtins';
import commonjs from 'rollup-plugin-commonjs';
import copy from 'rollup-plugin-copy';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'esm',
        exports: 'named',
        sourcemap: true,
      },
    ],
    plugins: [
      json(),
      builtins(),
      commonjs(),
      typescript({
        clean: true,
      }),
      copy({
        targets: [
          {
            src: 'src/config',
            dest: 'dist',
          },
        ],
        verbose: true,
      }),
    ],
  },
];
