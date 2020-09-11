import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: './src/index.ts',

  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    },
    {
      file: 'dist/index.mjs',
      format: 'es',
      sourcemap: true,
      exports: 'named'
    }
  ],

  plugins: [json(), typescript({ tsconfig: 'tsconfig.json' })]
};
