const path = require('path')
const ASSETS = path.resolve(__dirname, '../src')

module.exports = {
  postCss_loader_path: path.resolve(__dirname,'postcss.config.js'),
  js_path: './public/js/[name].[hash].js',
  css_path: './public/css/[name].[hash].css',
  image_path: './public/img/[name].[ext]',
  font_path: './public/fonts/[name].[ext]',
  entry_main: path.resolve(ASSETS, 'main.tsx'),
  entry_polyfills: path.resolve(ASSETS, 'polyfills.ts'),
  entry_vendors: path.resolve(ASSETS, 'vendors.ts'),
  entry_styles: path.resolve(ASSETS, 'styles.ts'),
  include_css: [ path.resolve(ASSETS, 'styles'), path.resolve(__dirname, '../node_modules') ],
  include_cssModule: [ ASSETS ],
  include_image: [ ASSETS ],
  include_font: [ ASSETS ],
  include_svg: [ ASSETS ],
  include_jsx: [ ASSETS ],
  include_tsx: [ ASSETS ],
  output_dir: path.resolve(__dirname, '../dist'),
  favicon_path: path.resolve(__dirname, '../public/favicon.ico'),
  indexHtml_path :path.resolve(__dirname, '../public/index.html'),
  copy_from_dir: path.resolve(__dirname, "../public"),
  copy_to_dir:path.resolve(__dirname, "../dist/public"),
  clean_dir: ['../dist'],
  clean_exclude: [],
  asset_manifest: '../dist'
}
