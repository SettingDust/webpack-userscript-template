import * as webpack from 'webpack'
import { Configuration } from 'webpack'

import banner from './scripts/banner'
import metadata from './monkey.config'
import LimitChunkCountPlugin = webpack.optimize.LimitChunkCountPlugin
import BannerPlugin = webpack.BannerPlugin

// noinspection JSUnusedGlobalSymbols
export default {
  entry: './src/index.ts',
  output: {
    filename: metadata.name.toLowerCase().replace(' ', '-') + '.user.js'
  },
  mode: 'production',
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
  optimization: {
    minimizer: [
      () => ({
        terserOptions: {
          mangle: false,
          output: {
            beautify: true
          }
        }
      })
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
