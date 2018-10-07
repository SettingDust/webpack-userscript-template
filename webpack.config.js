const path = require('path');
const monkey = require('./monkey.config');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BannerPlugin = require('webpack/lib/BannerPlugin');

module.exports = {
    entry: './src/monkey.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: monkey.name.toLowerCase().replace(" ", "-") + '.user.js'
    },
    mode: "none",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: "babel-loader"
            }, {
                test: /\.css$/,
                exclude: /(node_modules)/,
                use: [
                    'to-string-loader',
                    'css-loader',
                    'postcss-loader',
                    'style-loader',
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
            banner: () => {
                let headerString = [];
                headerString.push("// ==UserScript==");
                for (let headerKey in monkey) {
                    if (Array.isArray(monkey[headerKey])) {
                        for (let p in monkey[headerKey]) {
                            headerString.push("// @" + headerKey.padEnd(13) + monkey[headerKey][p]);
                        }
                        headerString.push("//  ");
                    } else {
                        headerString.push("// @" + headerKey.padEnd(13) + monkey[headerKey]);
                    }
                }
                headerString.push("// ==/UserScript==");
                headerString.push("  ");
                return headerString.join("\n");
            },
            raw: true
        })
    ]
};
