const webpack = require('webpack');
const path = require("path");
const argv = require('minimist')(process.argv.slice(2));

const projectName = "layout-manager";

let entries = ['./src/index.js'];
let plugins = [];

if(argv.env){
   entries.push('./examples/src/index.js');
}
else {
    plugins.push(new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    }));
    plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));
}

const options = {
    entry: entries,
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: projectName + '.js',
        libraryTarget: 'umd',
        library: "LayoutManager"
    },
    externals: [{
        react: {
            root: "React",
            commonjs2: "react",
            commonjs: "react",
            amd: "react"
        },
        "react-dom": {
            root: "ReactDOM",
            commonjs2: "react-dom",
            commonjs: "react-dom",
            amd: "react-dom"
        }
    }],
    module: {
        rules: [
            {
                test: /\.(css)$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }]
            },
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, "node_modules/"),
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: ['env', 'react']
                    }
                }
            }
        ]
    },
    plugins: plugins
};

module.exports = options;