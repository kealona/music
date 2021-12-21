const isProduction = process.env.NODE_ENV === 'production';
const CompressionPlugin = require("compression-webpack-plugin")
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  filenameHashing: true,
  productionSourceMap: false,
  css: {
    extract: true,
    sourceMap: false
  },
  chainWebpack: config => {

    // 移除 prefetch 插件
    config.plugins.delete('prefetch');
    // 移除 preload 插件，避免加载多余的资源
    config.plugins.delete('preload');

    config.module.rule('images')
      .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true
      })
      .end()
  },
  configureWebpack: config => {
    if (isProduction) {
      // 用cdn方式引入
      config.externals = {
        /* 'vue': 'Vue',
        'vuex': 'Vuex',
        'vue-router': 'VueRouter',
        'axios': 'axios',
        'element-ui': 'ELEMENT',
        'echarts': 'echarts' */
      }
      // 为生产环境修改配置...
      config.plugins.push(
        //生产环境自动删除console
        new UglifyJSPlugin({
          uglifyOptions: {
            // 删除注释
            output: {
              comments: false
            },
            compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log']
            },
            warnings: false
          },
          sourceMap: false,
          parallel: true
        })
      );
      return {
        plugins: [new CompressionPlugin({
          filename: '[path].gz[query]',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 10240,
          deleteOriginalAssets: false,
          algorithm: 'gzip'
        })]
      }
    } else {
      // 为开发环境修改配置...
    }
  },
  publicPath: './',
  devServer: {
  	hot: true,
  	open: true,
  	proxy: {
      '/node': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
        	'^/node': ''
        }
      }
  	}
  }
}
