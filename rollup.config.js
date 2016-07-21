import babel from 'rollup-plugin-babel'

export default {
  entry: './src/index.js',
  dest: 'index.js',
  plugins: [
    babel({
      presets: ['es2015-rollup', 'stage-1'],
      plugins: ['transform-runtime'],
      babelrc: false,
      exclude: 'node_modules/**'
    })
  ],
  format: 'cjs'
}
