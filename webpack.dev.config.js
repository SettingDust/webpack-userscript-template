const path = require('path');
const monkey = require('./monkey.dev.config');
const webpack = require('webpack');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    entry: {
        app: [
            './src/monkey.js'
        ],
        vendor: [
            'jquery',
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: monkey.name.toLowerCase().replace(" ", "-") + '.js'
    },
    mode: 'none',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: "babel-loader"
            }, {
                test: /\.less$/,
                exclude: /(node_modules)/,
                use: [
                    'less-loader',
                    'to-string-loader',
                    'css-loader',
                    'postcss-loader',
                ],
            }, {
                test: /\.(png|jpg|gif)$/,
                use: ['url-loader']
            }
        ],
    },
    plugins: [
        new webpack.optimize.SplitChunksPlugin({
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    name: 'vendor',
                    priority: 10,
                    enforce: true
                }
            }
        }),
        new webpack.BannerPlugin({
            banner: () => {
                let headerString = [];
                headerString.push("// ==UserScript==");
                for (let headerKey in monkey) {
                    if (Array.isArray(monkey[headerKey])) {
                        for (let p in monkey[headerKey]) {
                            headerString.push("// @" + headerKey.padEnd(13) + monkey[headerKey][p]);
                        }
                        headerString.push("");
                    } else {
                        headerString.push("// @" + headerKey.padEnd(13) + monkey[headerKey]);
                    }
                }
                headerString.push("// ==/UserScript==");
                headerString.push("");
                return headerString.join("\n");
            }, raw: true
        }),
    ]
};
