const path = require('path');
const ROOT = path.resolve(__dirname, 'src');
const DESTINATION = path.resolve(__dirname, 'lib');
module.exports = {
  context: ROOT,
  entry: {
    'index': './index.ts',
    'BodyText': './stories/body-text/body-text.ts',
    'BreadcrumbList': './stories/breadcrumb-list/breadcrumb-list.ts',
    'ContentContainer': './stories/content-container/content-container.ts',
    'GeonorgeFooter': './stories/geonorge-footer/geonorge-footer.ts',
    'GnAccordion': './stories/gn-accordion/gn-accordion.ts',
    'GnBadgeList': './stories/gn-badge-list/gn-badge-list.ts',
    'GnBreadcrumbList': './stories/gn-breadcrumb-list/gn-breadcrumb-list.ts',
    'GnButton': './stories/gn-button/gn-button.ts',
    'GnDialog': './stories/gn-dialog/gn-dialog.ts',
    'GnFieldContainer': './stories/gn-field-container/gn-field-container.ts',
    'GnIcon': './stories/gn-icon/gn-icon.ts',
    'GnInput': './stories/gn-input/gn-input.ts',
    'GnLabel': './stories/gn-label/gn-label.ts',
    'GnList': './stories/gn-list/gn-list.ts',
    'GnSelect': './stories/gn-select/gn-select.ts',
    'GnSrOnly': './stories/gn-sr-only/gn-sr-only.ts',
    'GnTable': './stories/gn-table/gn-table.ts',
    'GnTextarea': './stories/gn-textarea/gn-textarea.ts',
    'HeadingText': './stories/heading-text/heading-text.ts',
    'MainNavigation': './stories/main-navigation/main-navigation.ts',
    'MainSearchField': './stories/main-navigation/main-search-field/main-search-field.ts',
    'SearchTypeSelector': './stories/main-navigation/search-type-selector/search-type-selector.ts',
    'UserAccount': './stories/main-navigation/user-account/user-account.ts',
    'DownloadItem': './stories/main-navigation/download-items/download-items.ts',
    'MapItem': './stories/main-navigation/map-items/map-items.ts',
    'MainMenu': './stories/main-navigation/main-menu/main-menu.ts',
    'NavigationTabs': './stories/navigation-tabs/navigation-tabs.ts',
    'NavigationTabHeading': './stories/navigation-tabs/navigation-tab-heading/navigation-tab-heading.ts',
    'NavigationTabContent': './stories/navigation-tabs/navigation-tab-content/navigation-tab-content.ts'
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
