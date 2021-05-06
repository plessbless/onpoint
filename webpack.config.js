const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')


module.exports = {
    context: path.resolve(__dirname,'src'),
    mode: 'development',
    entry: './script.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./index.html"
        }),
        new CopyWebpackPlugin ({
            patterns: [{
                from: path.resolve(__dirname, 'src/assets'),
                to: path.resolve(__dirname, 'dist', 'assets')
            }]
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                use: ['file-loader'],
                // options: {
                //     name: '[name].[ext]',
                //     outputPatch: 'assets',
                //     publicPath: 'src/assets',
                //     emitFile: true,
                //     esModule: false
                // }
            }
        ]
    }


}