const path = require('path');
const monkey = require('./monkey.config');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BannerPlugin = require('webpack/lib/BannerPlugin');

module.exports = {
    entry: './src/monkey.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: monkey.header.name.toLowerCase().replace(" ", "-") + '.user.js'
    },
    mode: "none",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)(dist)/,
                loader: "babel-loader"
            }, {
                test: /\.css$/,
                exclude: /(node_modules)(dist)/,
                use: [
                    {loader: 'css-loader'},
                    {loader: 'postcss-loader'}
                ],
            }, {
                test: /\.(png|jpg|gif)$/,
                use: ['url-loader']
            }
        ],
    },
    plugins: [
        new UglifyJsPlugin({
            uglifyOptions: {
                mangle: false,
                output: {
                    beautify: true,
                },
            }
        }),
        new BannerPlugin({
            banner: monkey.buildedHeader(),
            raw: true
        })
    ]
};
