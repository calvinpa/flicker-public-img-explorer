module.exports = {
    devServer: {
        proxy: {
            '^/services': {
                target: 'https://www.flickr.com/',
                changeOrigin: true
            },
        }
    }
}
