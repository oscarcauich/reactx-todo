var path = require('path');
var webpack = require('webpack');

const commonConfig = {
    devtool: 'eval',
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loaders: ['awesome-typescript-loader']
            },
            {
                test: /\.json?$/,
                loaders: ['json-loader']
            },
            {
                test: /\.less?$/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
                loader: 'url-loader?limit=10000'
            },
            {
                test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/,
                loader: 'file-loader'
            }
        ]
    }
};

const index = Object.assign({}, commonConfig, {
    name: 'index',
    entry: [
        './src/index.tsx'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    }
});

module.exports = [
    index
];
