var webpack = require('webpack');

module.exports = {
    entry: './public/app/app.js',
    output: {
        path: './',
        filename: './public/app.min.js',
    },
    module: {
        loaders: [{
            test: /\.html$/,
            loader: 'html'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'file?name=img/[name].[ext]' // inline base64 URLs for <=10kb images, direct URLs for the rest
        }, {
            test: /\.css$/,
            loader: "style!css"
        }, {
            test: [/fontawesome-webfont\.svg/, /fontawesome-webfont\.eot/, /fontawesome-webfont\.ttf/, /fontawesome-webfont\.woff/, /fontawesome-webfont\.woff2/],
            loader: 'file?name=fonts/[name].[ext]'
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.ProvidePlugin({
          io: 'socket.io-client'
        })
    ]
}