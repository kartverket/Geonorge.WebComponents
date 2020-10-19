const path = require('path');
const ROOT = path.resolve(__dirname, 'src');
const DESTINATION = path.resolve(__dirname, 'lib');

module.exports = {
  context: ROOT,
  entry: {
    'index': './index.ts',
    'main-navigation': './custom-elements/main-navigation/main-navigation.ts',
    'main-search-field': './custom-elements/main-navigation/main-search-field/main-search-field.ts',
    'download-item': './custom-elements/main-navigation/download-items/download-items.ts',
    'map-item': './custom-elements/main-navigation/map-items/map-items.ts',
    'main-menu': './custom-elements/main-navigation/main-menu/main-menu.ts'
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
        test: /\.svg$/,
        loader: 'svg-inline-loader',
        options: {
          classPrefix: true
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
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
