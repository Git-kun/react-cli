const path = require( 'path' );
const ASSETS = path.resolve( __dirname, '../src' );

module.exports = {
  postCss_loader_path: path.resolve( __dirname, 'postcss.config.js' ),
  entry: {
    main: path.resolve( ASSETS, 'index.tsx' ),
    styles: path.resolve( ASSETS, 'styles.ts' ),
    polyfill: path.resolve( ASSETS, 'polyfill.ts' )
  },
  output: {
    js: 'js/[name].[hash].js',
    css: 'css/[name].[hash].css',
    image: 'media/[name].[ext]',
    font: 'fonts/[name].[ext]',
  },
  include: {
    css: [ path.resolve( ASSETS, 'styles' ), path.resolve( __dirname, '../node_modules' ) ],
    cssModule: [ ASSETS ],
    image: [ ASSETS ],
    font: [ ASSETS ],
    svg: [ ASSETS ],
    jsx: [ ASSETS ],
    tsx: [ ASSETS ],
  },
  template: {
    favicon: path.resolve( __dirname, '../public/favicon.ico' ),
    indexHtml: path.resolve( __dirname, '../public/index.html' ),
  },
  output_dir: path.resolve( __dirname, '../dist' ),
  copy_from_dir: path.resolve( __dirname, "../public" ),
  copy_to_dir: path.resolve( __dirname, "../dist/public" ),
  asset_manifest: '../dist'
};
