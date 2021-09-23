const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: "development",
    entry: [
        './src/index.js',
        '@babel/polyfill'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        assetModuleFilename: 'assets/[hash][ext]',
    },
    module: {
        rules: [
            // css
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },

            // js
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                }
            },

            // img
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                type: 'asset/resource',
            },
        ]
    },
    resolve: {
        extensions: ['.js'],
        fallback: {
            fs: false
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            favicon: "./src/img/favicon.svg"
        }),
        new Dotenv({
          path: './.env'
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 5001, //default 8080
        open: true,
        hot: true,
        watchContentBase: true,
    },
}