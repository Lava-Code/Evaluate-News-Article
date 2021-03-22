const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',       // Output Every thing
    output:{    
        libraryTarget: 'var',
        library: 'Client'
       },
    module: {
        rules: [
            {
                // Use REGEX mask to match js files & Add babel Loader
                test: /\\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [
                     'style-loader', //3- Inject CSS into DOM
                      'css-loader', // 2- Turns CSS into js
                      'sass-loader' // 1- Turns SASS into css file
                     ]
               }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/client/views/index.html',
            filename: './index.html'
        }),
        new CleanWebpackPlugin({
            dry: true,
            verbose: true,
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        // Configure workbox-webpack-plugin
        new WorkboxPlugin.GenerateSW()
    ]
}
