const path = require('path');
const ROOT = path.resolve(__dirname, 'src');
const DESTINATION = path.resolve(__dirname, 'lib');

module.exports = {
  context: ROOT,
  entry: {
    'index': './index.ts',
    'main-navigation': './custom-elements/main-navigation/main-navigation.ts',
    'main-search-field': './custom-elements/main-search-field/main-search-field.ts'
  },
  output: {
    path: DESTINATION,
    filename: '[name].js',
    library: 'geonorge',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [
      ROOT,
      'node_modules'
    ]
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: 'raw-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'assets/[folder]/[name].[ext]',
          }
        }]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'css-loader',
          'sass-loader',
        ],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'source-map-loader'
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'source-map',
  devServer: {}
};