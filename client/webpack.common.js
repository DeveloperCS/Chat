const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: [
        '../client/src/index.tsx'
    ],
    output: {
        publicPath: '/',
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }, {
            test: /\.html$/,
            use: [{
                loader: "html-loader"
            }]
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.(ts|tsx)$/,
            use: [{
                loader: 'ts-loader'
            }],
            exclude: /node_modules/
        }, {
            test: /\.svg$/,
            loader: 'svg-inline-loader'
        }, {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
                {
                    loader: 'file-loader',
                },
            ],
        }]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "../client/src/index.html",
            filename: "index.html"
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json', '.css', '.svg', '.png', '.jpg']
    },
    devServer: {
        publicPath: '../client/src/',
        historyApiFallback: true,
    }
};