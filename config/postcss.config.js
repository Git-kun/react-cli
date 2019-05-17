module.exports = {
  "plugins": [
    // require('postcss-flexbugs-fixes'),
    require("autoprefixer")({
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9', // React doesn't support IE8 anyway
      ],
      flexbox: 'no-2009',
    }),
    require("postcss-aspect-ratio-mini"),
    require("postcss-write-svg")({ utf8: false }),
    require("postcss-px-to-viewport")({
      viewportWidth: 414,
      viewportHeight: 736,
      unitPrecision: 3,
      viewportUnit: 'vw',
      selectorBlackList: ['.ignore', '.hairlines'],
      minPixelValue: 1,
      mediaQuery: false
    }),
    require("cssnano")({
      // preset: "advanced",
      autoprefixer: false,
      "postcss-zindex": false
    })

  ]
}
