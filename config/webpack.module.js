const webpackPath = require( './webpack.path' );
const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const os = require( 'os' );


module.exports = {
  rules: [
    {
      loader: 'thread-loader',
      options: {
        workers: os.cpus().length
      }
    },
    {
      test: /\.jsx?|tsx?$/,
      use: [ 'babel-loader' ],
    },
    {
      enforce: "pre",
      test: /\.js$/,
      loader: "source-map-loader"
    },
    {
      test: /\.tsx?$/,
      enforce: 'pre',
      loader: "tslint-loader"
    },
    {
      enforce: 'pre',
      test: /\.js$/,
      exclude: /node_modules/,
      include: path.resolve( __dirname, '/src/js' ),
      loader: 'eslint-loader'
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
    },
    {
      test: /\.(jpg|jpeg|bmp|svg|png|webp|gif)$/,
      use:[
        {
          loader: 'url-loader',
          options: {
            limit: 8 * 1024,
            name: webpackPath.output.image,
          },
        },
        {
          loader: 'img-loader',
          options: {
            plugins: [
              require('imagemin-gifsicle')({
                interlaced: false
              }),
              require('imagemin-mozjpeg')({
                progressive: true,
                arithmetic: false
              }),
              require('imagemin-pngquant')({
                floyd: 0.5,
                speed: 2
              }),
              require('imagemin-svgo')({
                plugins: [
                  { removeTitle: true },
                  { convertPathData: false }
                ]
              })
            ]
          }
        }
      ],
      include: webpackPath.include.image
    },
    {
      exclude: /\.(js|json|less|css|jsx)$/,
      loader: 'file-loader',
      options: {
        outputPath: 'media/',
        name: '[name].[hash].[ext]'
      }
    }
  ]
};
