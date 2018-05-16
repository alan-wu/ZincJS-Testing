var nodeExternals = require('webpack-node-externals');
var path = require('path');
var isCoverage = process.env.NODE_ENV === 'coverage';

module.exports = {
  mode: 'none',
  resolve: {
    modules: [path.resolve('./ZincJS/src'), "node_modules"],
    extensions: ['.ts', '.js'],
  },
  output: {
    // use absolute paths in sourcemaps (important for debugging via IDE)
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  module: {
    rules: [].concat(
      isCoverage ? {
        test: /\.(js|ts)/,
        include: path.resolve('ZincJS/src'), // instrument only testing sources with Istanbul, after ts-loader runs
        exclude: /(node_modules|bower_components)/,
        loader: 'istanbul-instrumenter-loader',
        query: {
          esModules: true
        }
      }: [],
      {
        test: /.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      }
    )
  },
  target: 'node',  // webpack should compile node compatible code
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  devtool: "inline-cheap-module-source-map"
};

