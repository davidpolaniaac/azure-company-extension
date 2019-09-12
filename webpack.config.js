const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');

process.env.NODE_ENV = 'production';
process.env.BABEL_ENV = 'production';

const entries = {};

const extensionsDir = path.join(__dirname, 'src/extensions');
fs.readdirSync(extensionsDir).filter((dir) => {
  if (fs.statSync(path.join(extensionsDir, dir)).isDirectory()) {
    entries[dir] = `./${path.relative(process.cwd(), path.join(extensionsDir, dir, 'index'))}`;
  }
});

module.exports = {
  entry: entries,
  output: {
    filename: '[name]/index.js',
    publicPath: '/dist/',
  },
  resolve: {
    extensions: ['.jsx', '.js'],
    alias: {
      'azure-devops-extension-sdk': path.resolve('node_modules/azure-devops-extension-sdk'),
    },
  },
  devtool: 'inline-source-map',
  devServer: {
    https: true,
    port: 3000,
  },
  stats: {
    warnings: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'azure-devops-ui/buildScripts/css-variables-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.woff$/,
        use: [{
          loader: 'base64-inline-loader',
        }],
      },
      {
        test: /\.html$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([{ from: '**/*.html', context: 'src/extensions' }]),
  ],
};
