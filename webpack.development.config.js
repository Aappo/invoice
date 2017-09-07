let path = require('path');
let webpack = require('webpack');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const flexbugs = require('postcss-flexbugs-fixes');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    './src/client/index'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/static/',
    library: 'invoice',
    libraryTarget: 'umd',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      'Promise': 'polyfill-promise'
    })
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
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },

  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'src/client'),
          path.join(__dirname, 'src/common')
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
                removeAttrs: { attrs: 'xmlns.*' }
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
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [flexbugs, precss, autoprefixer],
            },
          },
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
