const path = require('path');
const ROOT = path.resolve(__dirname, 'src');
const DESTINATION = path.resolve(__dirname, 'lib');
module.exports = {
  context: ROOT,
  entry: {
    'index': './index.ts',
    'init': './init.ts',
    'BodyText': './custom-elements/body-text/body-text.ts',
    'BreadcrumbList': './custom-elements/breadcrumb-list/breadcrumb-list.ts',
    'ContentContainer': './custom-elements/content-container/content-container.ts',
    'GeonorgeFooter': './custom-elements/geonorge-footer/geonorge-footer.ts',
    'GnInput': './custom-elements/gn-input/gn-input.ts',
    'GnSelect': './custom-elements/gn-select/gn-select.ts',
    'GnTable': './custom-elements/gn-table/gn-table.ts',
    'HeadingText': './custom-elements/heading-text/heading-text.ts',
    'MainNavigation': './custom-elements/main-navigation/main-navigation.ts',
    'MainSearchField': './custom-elements/main-navigation/main-search-field/main-search-field.ts',
    'SearchTypeSelector': './custom-elements/main-navigation/search-type-selector/search-type-selector.ts',
    'DownloadItem': './custom-elements/main-navigation/download-items/download-items.ts',
    'MapItem': './custom-elements/main-navigation/map-items/map-items.ts',
    'MainMenu': './custom-elements/main-navigation/main-menu/main-menu.ts',
    'NavigationTabs': './custom-elements/navigation-tabs/navigation-tabs.ts',
    'NavigationTabHeading': './custom-elements/navigation-tabs/navigation-tab-heading/navigation-tab-heading.ts',
    'NavigationTabContent': './custom-elements/navigation-tabs/navigation-tab-content/navigation-tab-content.ts',
    'StandardButton': './custom-elements/standard-button/standard-button'
  },
  output: {
    path: DESTINATION,
    filename: '[name].js',
    library: ['geonorge', '[name]'],
    libraryTarget: 'umd',
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
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
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
  devServer: {
    client: false,
    static: {
      directory: path.join(__dirname, "demo")
    }
  }
};
