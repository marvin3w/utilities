const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: () => {
    const entries = {};
    const scssFiles = glob.sync('./**/*.scss');
    
    scssFiles.forEach(file => {
      const name = file.replace(/^\.\//, '').replace(/\.scss$/, '');
      entries[name] = './' + file;
    });
    
    return entries;
  },
  output: {
    path: path.resolve(__dirname),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: (pathData) => {
        return pathData.chunk.name.includes('/') 
          ? '[name].css' 
          : '[name]/[name].css';
      }
    })
  ],
  watch: true,
  mode: 'development',
  resolve: {
    modules: [path.resolve(__dirname), 'node_modules'],
  },
};