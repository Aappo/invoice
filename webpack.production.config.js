let path = require('path');
let webpack = require('webpack');

module.exports = {
  entry: [
    './src/client/index'
  ],
  output: {
    path: path.resolve(__dirname, './src/server/static'),
    filename: 'bundle.js',
    publicPath: '/static/',
    library: 'invoice',
    libraryTarget: 'umd',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      'Promise': 'polyfill-promise'
    }),
    new webpack.optimize.UglifyJsPlugin()
  ],
  resolve: {
    modules: [
      "/var/tmp/base/node_modules"
    ],
    extensions: ['.json', '.jsx', '.js']
  },

  resolveLoader: {
    modules: ['/var/tmp/base/node_modules'],
    moduleExtensions: ['-loader', '*'],
    extensions: ['.js']
  },

  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'src/client')
        ],
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['transform-object-assign', 'transform-decorators-legacy']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(eot|woff|woff2|ttf|png|jpg)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      },
      {
        test: /\.svg$/,
        use: [{
          loader: 'react-svg-loader',
          options: {
            es5: true,
            svgo: {
              plugins: [{
                removeAttrs: {attrs: 'xmlns.*'}
              }]
            }
          }
        }]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader"
        ]
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      }
    ]
  }
};
