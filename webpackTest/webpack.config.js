const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = env => {
  if (!env) { // 如果没有参数，默认为{}
    env = {}
  }

  let plugins = [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './app/views/index.html'
    })
  ]

  if (env.production) { // 如果是生产环境
    plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new ExtractTextPlugin("style.css", {ignoreOrder: true})
    )
  }

  return {
    entry: { // 定义入口文件
      app: './app/js/main.js'
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"), // 静态文件的输出
      compress: true, // 开启gzip压缩
      port: 9000
    },
    module: {
      loaders: [{
        test: /\.html$/,
        loader: 'html-loader'
      },{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          cssModules: {
            localIdentName: '[path][name]---[local]---[hash:base64:5]',
            camelCase: true
          },
          extractCSS: true,
          loaders: env.production?{
            css: ExtractTextPlugin.extract({use: 'css-loader!px2rem-loader?remUnit=40&remPrecision=8', fallback: 'vue-style-loader'}),
            scss: ExtractTextPlugin.extract({use: 'css-loader!px2rem-loader?remUnit=40&remPrecision=8!sass-loader', fallback: 'vue-style-loader'})
          }:{
            css: 'vue-style-loader!css-loader!px2rem-loader?remUnit=40&remPrecision=8',
            scss: 'vue-style-loader!css-loader!px2rem-loader?remUnit=40&remPrecision=8!sass-loader'
          }
        }
      },{
        test: /\.scss$/, // 默认从右向左串行解析
        loader: 'style-loader!css-loader!sass-loader'
      }]
    },
    resolve: {
      extensions: [
        '.js', '.vue', '.json' // 解析文件的后缀名  默认会给引入的文件添加后缀
      ],
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    plugins,
    output: {
      filename: '[name].min.js', // 指定生成的文件名称
      path: path.resolve(__dirname, 'dist') // 路径处理，在当前路径下，创建dist目录，并存放生成文件
    }
  }
}
