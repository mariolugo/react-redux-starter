import webpack from 'webpack';
import copyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import * as common from './webpack.common.config';

export const cache = true;
export const devtool = 'cheap-module-source-map';
export const output = common.output;
export const context = common.context;
export const resolve = common.resolve;
export const postcss = (webpack) => common.postcss;

export const entry = {
  app: common.clientPath,
  vendor: common.entry.vendor
};

export const module = {
  loaders: [
    {
      test: [/\.jsx?$/],
      include: [/src/],
      loader: 'babel-loader',
      exclude: [/node_modules/, /dist/, /server/],
      query: {
        cacheDirectory: true,
        presets: ['es2015', 'stage-0', 'react']
      }
    },
    {
      test: /\.css/,
      loader: ExtractTextPlugin.extract('style-loader',  'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]-[hash:base64:4]!postcss-loader')
    }
  ]
};

export const plugins = [
  new webpack.DefinePlugin({'process.env': {'NODE_ENV': '"production"'}}),
  new copyWebpackPlugin([{ from: 'src/app/assets', to: '../dist/assets' }]),
  new webpack.NoErrorsPlugin(),
  new webpack.optimize.UglifyJsPlugin({compressor: { warnings: false }, output: {comments: false}}),
  new ExtractTextPlugin('bundle.css', { allChunks: true }),
]
.concat(common.plugins);
