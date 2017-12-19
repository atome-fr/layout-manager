'use strict';

var argv = require('minimist')(process.argv.slice(2));
var path = require("path");

console.log("Build JS with parameters => target = "+argv.target+", env = "+argv.env);

var webpack = require('webpack');
var fs = require('fs');


var entries=["./js/index.js"];
var plugins = [];

plugins.push(new webpack.ProvidePlugin({'logger' : "loglevel"}));


var options = {

    entry:  entries,
    output: {
        path:     path.resolve(__dirname,'./dist'),
        filename: 'layout-manager.js'
    },

	resolve: {
		alias:{},
		modules: [
			path.resolve(__dirname, 'node_modules')
		],
        symlinks: false
    },

    module: {
        
        rules: [
            {
                test: /\.json$/,
                use: [
                    { loader: "json-loader" }
                ],
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            },
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, "./src/")],
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: ['es2015']
                    }
                }
            },
            {
                test: /\.js$/,
                enforce: "pre", // preload the jshint loader
                include: [path.resolve(__dirname, "./src/js/")],
                exclude: /node_modules/, // exclude any and all files in the node_modules folder
                use: {
                    loader: 'jshint-loader',
                }
            },
            {
                test: /\.(png|jpg|gif|svg|eot)$/,
                use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							name: '[path][name].[ext]',
							publicPath: '../../../'
						}
					}
				]
            },
            {
                test: /\.(ttf|woff|woff2)$/,
                loader: 'url-loader'
            },
        ]
    },
    plugins: plugins,
};


module.exports = options;