'use strict';

var webpack = require('webpack');
var path = require('path');

const projectName = "layout-manager";

var options = {
    entry: './src',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: projectName+'.js'
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
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
};


module.exports = options;