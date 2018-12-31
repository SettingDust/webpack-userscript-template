const path = require('path');
const monkey = require('./monkey.dev.config');
const fs = require('fs');

const Terser = require('terser-webpack-plugin');
const colors = require('colors');

if (!fs.existsSync('test')) fs.mkdirSync('test');
fs.writeFileSync('./test/header.js', monkey.buildedHeader());

console.log(
    `[` +
    colors.grey('Webpack') +
    `]` +
    ' Copy the content of test/header.js to your TamperMonkey plugin'.green
);

module.exports = {
    entry: monkey.config.entry,
    output: {
        path: path.resolve(__dirname, 'test'),
        filename: monkey.header.name.toLowerCase().replace(' ', '-') + '.js'
    },
    watch: true,
    mode: 'none',
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /(node_modules)/,
                use: [{ loader: 'css-loader' }, { loader: 'postcss-loader' }]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: ['url-loader']
            }
        ]
    },
    plugins: [
        // new Terser({
        //     terserOptions: {
        //         mangle: false,
        //         output: {
        //             beautify: true
        //         }
        //     }
        // })
    ]
};
