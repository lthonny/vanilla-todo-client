const path = require('path');


// const jsLoaders = function () {
//   const loaders = [];
//   return {
//     loader: 'babel-loader',
//     options: babelOptions()
//   }

//   if (isDev) {
//     loaders.push('eslint-loader');
//   }

//   return loaders;
// }


module.exports = {
  mode: "development",
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      //   exclude: '/node_modules/'
      // },
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        loader: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      }
      // {
      //   test: /\.js$/,
      //   exclude: '/node_modules/',
      //   use: jsLoaders(),
      // }
    ]
  }
}