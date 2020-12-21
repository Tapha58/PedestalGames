
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/static/wallgames/frontend/'
        : '/',
    chainWebpack: config => {
        if(config.plugins.has('extract-css')) {
            const extractCSSPlugin = config.plugin('extract-css')
            extractCSSPlugin && extractCSSPlugin.tap(() => [{
                filename: '[name].css',
                chunkFilename: '[name].css'
            }])
        }
        // config.optimization.delete('splitChunks')
        config.optimization.splitChunks(false)
    },
    configureWebpack: {
        output: {
            filename: '[name].js',
            chunkFilename: '[name].js'
        }
    },
    pluginOptions: {
        eruda: {
            enable: true
        }
    }
}