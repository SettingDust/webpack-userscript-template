const path = require('path');
const monkey = require('monkey.config');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'ghost-trapper.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: "babel-loader"
            },
            {
                test: /\.less$/,
                exclude: /(node_modules)/,
                loader: 'less-loader'
            }
        ],
    },
};