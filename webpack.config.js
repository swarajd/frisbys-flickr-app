const webpack = require("webpack")

module.exports = {
    entry: './app/index.js',
    output: {
        filename: 'bundle.min.js',
        path: __dirname + '/dist'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true
        })
    ]
}