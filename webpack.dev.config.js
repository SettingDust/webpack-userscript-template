const path = require('path');
const monkey = require('./monkey.dev.config');
const fs = require("fs");

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

if (!fs.existsSync("test"))
    fs.mkdirSync("test");
fs.writeFileSync("./test/header.js",getHeader());

module.exports = [{
    entry: './src/monkey.js',
    output: {
        path: path.resolve(__dirname, 'test'),
        filename: monkey.name.toLowerCase().replace(" ", "-") + '.js'
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
                }
            }
        })
    ]
}];

function getHeader() {
    let headerString = [];
    headerString.push("// ==UserScript==");
    for (let headerKey in monkey) {
        if (Array.isArray(monkey[headerKey])) {
            for (let p in monkey[headerKey]) {
                headerString.push("// @" + headerKey.padEnd(13) + monkey[headerKey][p]);
            }
            headerString.push("//");
        } else {
            headerString.push("// @" + headerKey.padEnd(13) + monkey[headerKey]);
        }
    }
    headerString[headerString.length - 1] = "// ==/UserScript==";
    headerString.push("");
    return headerString.join("\n");
}