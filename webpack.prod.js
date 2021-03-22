const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    output:{    
        libraryTarget: 'var',
        library: 'Client'
       },
       optimization: {                      //Add Optimization for JS and CSS
        minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})]
     },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, // 3- 3- Inject Minified CSS file into DOM
                      'css-loader',             //  2- Turns CSS into js
                       'sass-loader'           //   1- Turns SASS into CSS file
                     ]
               }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/client/views/index.html',
            filename: './index.html'
        }),
        // Using contenthash to improve the performance by using caching technique, to avoid loading new style.
        new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
        // Configure workbox-webpack-plugin
        new WorkboxPlugin.GenerateSW()
    ],
}
