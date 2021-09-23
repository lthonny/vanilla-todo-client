const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Dotenv = require('dotenv-webpack');

const { plugins } = require('./webpack.config')

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {
    mode: 'development',
    entry: ['./src/index.js', '@babel/polyfill'],
    output: {
        filename: `./js/${filename('js')}`,
        path: path.resolve(__dirname, 'app'),
        assetModuleFilename: 'assets/[hash][ext]',
    },
    module: {
        rules: [
            // html
            {
                test: /\.html$/,
                loader: 'html-loader',
            },

            // css
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { // hmr: isDev
                        },
                    },
                    'css-loader',
                ],
            },

            // js
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },

            // img
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                use: [{
                    // loader: 'file-loader',
                    // options: `./img/${filename(('[ext]'))}`,
                }]
            },
        ],
    },
    resolve: {
        extensions: ['.js'],
        fallback: {
            fs: false,
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            // favicon: './src/img/favicon.svg',
            filename: 'index.html',
            minify: {
                collapseWhitespace: isProd,
            },
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `./css/${filename('css')}`,
        }),
        new CopyPlugin({
            patterns: [
                {from: path.resolve(__dirname, 'src/img'), to: path.resolve(__dirname, 'app')}
            ]
        }),
        new Dotenv({
            path: './.env',
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            generateStatsFile: true,
            statsOptions: { source: false }
        }),
    ],
    devtool: isProd ? false : 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'app'),
        port: 5001,
        open: true,
        hot: true,
        watchContentBase: true,
        historyApiFallback: true,
        compress: true,
    },
}

