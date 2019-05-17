const webpackPath = require('./webpack.path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const IS_PRODUCTION = process.env.NODE_ENV === 'production';


module.exports = {
  strictExportPresence: true,
  unknownContextCritical: false,
  rules: [
    {
      test: /\.jsx?|tsx?$/,
      use: ['babel-loader'],
    },
    {
      enforce: "pre",
      test: /\.js$/,
      loader: "source-map-loader"
    },
    {
      enforce: "pre",
      test: /\.module.css$/,
      loader: "typed-css-modules-loader"
    },
    // {
    //   test: /\.svg$/,
    //   use: [ '@svgr/webpack', 'url-loader' ],
    //   include: webpack_path.include_svg
    // },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: webpackPath.output.image
      },
      include: webpackPath.include.image
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: webpackPath.output.font
      },
      include: webpackPath.include.font
    },
    {
      test: /\.module\.css$/, // css modules
      use: [
        IS_PRODUCTION ? MiniCssExtractPlugin.loader : 'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: webpackPath.postCss_loader_path
            },
            ident: 'postcss',
          }
        }
      ],
      include: webpackPath.include.cssModule
    },
    {
      test: /\.css$/,
      use: [
        IS_PRODUCTION ? MiniCssExtractPlugin.loader : 'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: false,
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: webpackPath.postCss_loader_path
            },
            ident: 'postcss',
          }
        }
      ],
      include: webpackPath.include.css
    },
    {
      test: /\.(mov|mp4)$/,
      use: [
        'file-loader'
      ]
    }
  ]
};
