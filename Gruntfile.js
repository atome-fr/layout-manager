/**
 * @namespace Gruntfile
 * @author thomaschevalier
 * @date 04/03/2016
 */

var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var semver = require('semver');

var projectName = "layout-manager";

var common = {
    entry: './src',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: projectName+'.js'
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
        })
    ]
};

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jsdoc : {
            // JSDoc
            dist : {
                src: ['./src/**/*.js', './src/*.js'],
                options: {
                    destination: 'doc'
                }
            }
        },
        webpack: {
            // ConfigDev
            dev: merge(common,{}),

            // ConfigDev with Watcher
            devWatch: merge(common,
                {
                    watch: true,
                    keepalive: true,
                    failOnError: false
                }),
            prod: merge(common,{
                output: {
                    filename: projectName+'.min.js',
                },
                plugins:[
                    new webpack.optimize.UglifyJsPlugin({minimize: true})
                ]
            }),
            test: merge(common,{
                entry: './src/index.test.js',
                output: {
                    filename: projectName+'.test.js',
                },
            }),

            testWatch: merge(common,{
                entry: './src/index.test.js',
                output: {
                    filename: projectName+'.test.js',
                },
                watch: true,
                keepalive: true,
                failOnError: false
            })
        },
        parallel: {
            webpackWatch: {
                options: {
                    grunt: true,
                    stream: true
                },
                tasks: ['webpack-dev-watch', 'webpack-test-watch']
            }
        },
        jshint: {
            beforeBuild:{
                options:{
                    jshintrc: '.jshintrc',
                    ignores : ['./src/lib/']
                },
                src: ['./src/']
            },
            afterBuild: {
                options:{
                    jshintrc: '.jshintrc'
                },
                src: ['./dist/'+projectName+'.js','./dist/'+projectName+'.min.js','./dist/'+projectName+'.test.js']
            }
        }
    });

    // Plugins required for tasks
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-parallel');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Webpack Tasks
    grunt.registerTask('webpack-dev', ['webpack:dev']);
    grunt.registerTask('webpack-dev-watch', ['webpack:devWatch']);
    grunt.registerTask('webpack-prod', ['webpack:prod']);
    grunt.registerTask('webpack-test', ['webpack:test']);
    grunt.registerTask('webpack-test-watch', ['webpack:testWatch']);
    grunt.registerTask('webpack-build', ['jshint:beforeBuild','webpack:dev', 'webpack:prod', 'webpack:test']);

    // JSDoc Task
    grunt.registerTask('jsdoc-generate', ['jsdoc:dist']);

    // Parallel Task
    grunt.registerTask('webpack-watcher', ['parallel:webpackWatch']);

    //Custom task
    grunt.registerTask('increment_prerelease_version','increment the version of the module',function(){
        var packageJSON = grunt.file.readJSON('./package.json');
        var newVersion = semver.inc(packageJSON.version,'prerelease');
        packageJSON.version = newVersion;
        grunt.file.write('./package.json',JSON.stringify(packageJSON,null,'  '));
    });

    grunt.registerTask('increment_beta_version','increment the version of the module in beta mode',function(){
        var packageJSON = grunt.file.readJSON('./package.json');
        var newVersion = semver.inc(packageJSON.version,'prerelease','beta');
        packageJSON.version = newVersion;
        grunt.file.write('./package.json',JSON.stringify(packageJSON,null,'  '));
    });

};