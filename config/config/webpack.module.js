
const webpack_path = require('./webpack.path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const postCss_loader = {
  loader: 'postcss-loader',
  options: {
    config: {
      path: webpack_path.postCss_loader_path
    },
    ident: 'postcss',
  }
}

const css_loader = ( bool ) => {
  return {
    loader: 'css-loader',
    options: {
      modules: bool,
      minimize: true,
    }
  }
}

module.exports = {
  rules: [ {
    test: /\.tsx?$/,
    use: [
      "awesome-typescript-loader"
    ],
    include: webpack_path.include_tsx,
  },
    {
      test: /\.jsx?$/,
      use: [ 'happypack/loader?id=jsx' ],
      include: webpack_path.include_jsx
    },
    // {
    //   test: /\.jsx?$/,
    //   use: [ 'babel-loader' ],
    //   include: webpack_path.include_jsx
    // },
    {
      enforce: "pre",
      test: /\.js$/,
      loader: "source-map-loader"
    },
    {
      test: /\.svg$/,
      use: [ '@svgr/webpack', 'url-loader' ],
      include: webpack_path.include_svg
    },
    {
      test: /\.(png|jpe?g|gif)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: webpack_path.image_path
      },
      include: webpack_path.include_image

    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: webpack_path.font_path
      },
      include: webpack_path.include_font
    },
    {
      test: /\.module\.css$/, // css modules
      use: [
        IS_PRODUCTION ?  MiniCssExtractPlugin.loader: 'style-loader',
        css_loader(true),
        postCss_loader
      ],
      include: webpack_path.include_cssModule
    },
    {
      test: /\.css$/,
      use: [
        IS_PRODUCTION ?  MiniCssExtractPlugin.loader: 'style-loader',
        css_loader(false),
        postCss_loader
      ],
      include: webpack_path.include_css
    },
    {
      test: /\.(mov|mp4)$/,
      use: [
        'file-loader'
      ]
    }
  ]
}
