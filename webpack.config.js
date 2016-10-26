var ExtractTextPlugin = require('extract-text-webpack-plugin');

function getDevTool() {
    if (process.env.NODE_ENV !== 'production')
        return 'source-map'; //enables source map
    else
        return false; 
}

function getStyleLoader() {
    if (process.env.NODE_ENV !== 'production')
        return 'style!css!sass'; //enables HMR
    else
        return ExtractTextPlugin.extract('css!sass'); // Extracts CSS to it's own file
}

module.exports = {
    entry: {
        main: './src/js/main.js'
    },
    output: {
        filename: './build/js/[name].js'
    },
    devtool: getDevTool(), 
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'react-hot-loader/webpack'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: getStyleLoader()
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('./build/css/main.css', {
            allChunks: true
        })
    ]
}