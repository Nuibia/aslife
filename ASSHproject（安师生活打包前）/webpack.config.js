const path = require('path')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: path.join(__dirname, './src/main.js'),//入口文件
    output: {
        path: path.join(__dirname, './dist'), //出口（打包后）文件路径
        filename: 'bundle.js' //出口（打包后））文件名
    },
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            {
                test: /\.(jpg|jpeg|gif|png)$/, use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            },
            { test: /\.(otf|eot|svg|ttf|woff|woff2)$/, use: 'url-loader' },
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.vue$/, use: 'vue-loader' }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    mode:'production',//执行webpack命令时，使用什么模式
    performance:{
        hints:'warning',
        maxAssetSize:3000000,//单位 字节 默认250Kb(250000)
        maxEntrypointSize:3000000
    }

}

