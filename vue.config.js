module.exports = {
    devServer: {
        proxy: {
            '^/services': {
                target: 'https://www.flickr.com/',
                changeOrigin: true
            },
        }
    },
    publicPath: process.env.NODE_ENV === "production" ? "/flicker-public-img-explorer/" : "/"
}
