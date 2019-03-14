module.exports = {
    historyApiFallback: true, // 不跳转
    https: false,
    disableHostCheck: true,
    hot: true,
    inline: true, // 刷新页面
    progress: true,
    overlay: true,
    port: 8081,
    // host: '0.0.0.0',
    open: true,
    proxy: {
        '/api/*': {
            target: 'http://172.160.0.1/',
            secure: false
        },
    }
}