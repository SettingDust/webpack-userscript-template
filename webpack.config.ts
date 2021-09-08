import * as webpack from 'webpack'
import { Configuration } from 'webpack'

import banner from './scripts/banner'
import metadata from './monkey.config'
import LimitChunkCountPlugin = webpack.optimize.LimitChunkCountPlugin
import BannerPlugin = webpack.BannerPlugin
import TerserPlugin from 'terser-webpack-plugin'

// noinspection JSUnusedGlobalSymbols
export default {
  entry: './src/index.ts',
  output: {
    filename: metadata.name.toLowerCase().replace(' ', '-') + '.user.js'
  },
  mode: 'none',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: false,
          format: {
            comments: (node, comment) => comment.type === 'comment1'
              && /(^\s==\/?UserScript==)|(^\s@.+\s+.+$)|(^\s$)/.test(comment.value)
          }
        }
      })
    ]
  },
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
  plugins: [
    new LimitChunkCountPlugin({ maxChunks: 1 }),
    new BannerPlugin({
      raw: true,
      banner: banner()
    })
  ]
} as Configuration
