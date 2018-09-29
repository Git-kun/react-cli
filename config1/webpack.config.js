const baseConfig = require('./webpack.base.config');

const merge = require('webpack-merge');


console.log('当前环境', process.env.NODE_ENV);

const envConfig = () => {
    if (process.env.NODE_ENV === 'development') {
        return require('./webpack.dev.config');
    } else {
        return require('./webpack.prod.config');
    }
}

module.exports = merge(baseConfig, envConfig())