const path = require( 'path' );
const ASSETS = path.resolve( __dirname, '../src' );

module.exports = {
  postCss_loader_path: path.resolve( __dirname, 'postcss.config.js' ),
  entry: {
    main: path.resolve( ASSETS, 'index.tsx' ),
    styles: path.resolve( ASSETS, 'styles.ts' ),
    rely: path.resolve( ASSETS, 'other.ts' ),
    polyfill: path.resolve( ASSETS, 'polyfill.ts' )
  },
  output: {
    js: 'mobile/szfc/js/[name].[hash].js',
    css: 'mobile/szfc/css/[name].[hash].css',
    image: 'mobile/szfc/media/[name].[ext]',
    font: 'mobile/szfc/fonts/[name].[ext]',
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
