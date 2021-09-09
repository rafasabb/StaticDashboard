const HtmlWebPackPlugin = require('html-webpack-plugin');
const WebpackCdnPlugin = require('webpack-cdn-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.html$/,
        use: [{ loader: 'html-loader' }],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new BundleAnalyzerPlugin(),
    new WebpackCdnPlugin({
      modules: {
        react: [
          { name: 'react', var: 'React', path: 'umd/react.production.min.js' },
          { name: 'react-dom', var: 'ReactDOM', path: 'umd/react-dom.production.min.js' },
          { name: 'react-table', var: 'ReactTable', path: 'dist/react-table.production.min.js' },
          { name: 'd3', var: 'd3', path: 'dist/d3.min.js' },
        ],
      },
    }),
  ],
};
