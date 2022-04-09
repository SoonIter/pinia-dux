import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';
import jsx from 'acorn-jsx';

export default {
  input: "./index.ts",
  acornInjectPlugins: [jsx()],
  external: ['react'], // 增加了这一行。
  plugins: [
    resolve(),
    commonjs(),
    typescript({ jsx: 'preserve' }),
    babel({
      presets: ['@babel/preset-react'],
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx']
    })
  ],
  output: {
    file: 'dist/bundle.js',
    format: 'esm',
    plugins: [
      getBabelOutputPlugin({
        presets: ['@babel/preset-env'],
      })
    ]
  },
}
