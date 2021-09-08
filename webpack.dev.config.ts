import * as webpack from 'webpack'
import { Configuration } from 'webpack'
import metadata from './monkey.config'
import path from 'path'
import LimitChunkCountPlugin = webpack.optimize.LimitChunkCountPlugin
import * as fs from 'fs'
import banner from './scripts/banner'
import chalk from 'chalk'

if (!fs.existsSync('build')) fs.mkdirSync('build')
fs.writeFileSync('./build/HEADER', banner(true))

console.log(chalk.bold(`copy the content of ${chalk.green('./build/HEADER')} to your Monkey plugin`))

// noinspection JSUnusedGlobalSymbols
export default {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: metadata.name.toLowerCase().replace(' ', '-') + '.user.js'
  },
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['to-string-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: 'asset/inline'
      }
    ]
  },
  plugins: [new LimitChunkCountPlugin({ maxChunks: 1 })]
} as Configuration
