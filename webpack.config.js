'use strict';

var webpack = require('webpack');
var path = require('path');

const projectName = "layout-manager";

var options = {
    entry: './src',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: projectName+'.js',
        libraryTarget: 'umd',
        library: "LayoutManager"
    },
    externals: {
        // require("jquery") is external and available
        //  on the global var jQuery
        "jquery": "jQuery"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, "src/")],
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: ['es2015']
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
};


module.exports = options;