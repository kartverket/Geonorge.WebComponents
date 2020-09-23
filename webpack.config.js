const path = require('path');
const ROOT = path.resolve(__dirname, 'src');
const DESTINATION = path.resolve(__dirname, 'public');

module.exports = {
   context: ROOT,
   entry: {
      'main': './index.ts',
      'main-navigation': './custom-elements/main-navigation/main-navigation.element.ts'
   },
   output: {
      path: `${DESTINATION}/lib`,
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
            exclude: [/node_modules/],
            use: 'awesome-typescript-loader'
         }
      ]
   },
   devtool: 'cheap-module-source-map',
   devServer: {}
};

