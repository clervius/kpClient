const path = require('path')
const webpack = require('webpack')
const DashboardPlugin = require('webpack-dashboard/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const PATHS = {
  root: path.resolve(__dirname, '..'),
  nodeModules: path.resolve(__dirname, '../node_modules'),
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist')
}

const DEV_SERVER = {
  hot: true,
  hotOnly: true,
  historyApiFallback: true,
  overlay: true
}

module.exports = (env = {}) => {
  const isBuild = !!env.build
  const isDev   = !env.build
  const isSourceMap = !!env.sourceMap || isDev

  const awesomeLoaderConfig = [ {
    loader: 'awesome-typescript-loader',
    options: {
      transpileOnly: true,
      useTranspileModule: false,
      sourceMap: isSourceMap
    }
  }]

  const hotLoaderConfig = [ {
    loader: 'ts-loader',
    options: {
      transpileOnly: true,
      compilerOptions: {
        sourceMap: isSourceMap,
        target: isDev ? 'es2015' : 'es5',
        isolatedModules: true,
        noEmitOnError: false
      }
    }
  }]

  return {
    cache: true,
    devtool: isDev ? 'eval-source-map': 'source-map',
    devServer: DEV_SERVER,
    context: PATHS.root,
    entry: {
      app: [
        'react-hot-loader/patch',
        './src/index.tsx'
      ]
    },
    output: {
      path: PATHS.dist,
      filename: isDev ? '[name].js': '[name].[hash].js',
      publicPath: '/'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      modules: ['src', 'node_modules']
    },
    module: {
      rules: [{
        test: /\.tsx?$/,
        include: PATHS.src,
        use: (env.awesome ? awesomeLoaderConfig : hotLoaderConfig)
      }, {
        test: /\.json$/,
        include: [PATHS.src],
        use: {
          loader: 'json-loader'
        }
      }, {
        test: /\.css$/,
        use: [
          'style-loader', 'css-loader' ,
        //   {
        //     loader: 'style-loader',
        //     options: {
        //         injectType: 'singletonStyleTag'
        //     }
        //   }, {
        //     loader: 'postcss-loader',
        //     options: styles.getPostCssConfig( {
        //         themeImporter: {
        //             themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' )
        //         },
        //         minify: true
        //     } )
        // }, 'postcss-url'
      ]
      }, {
        test: /\.(woff(2)?|ttf|eot|svg|gif|png)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
            }
        }]
      }]
    },
    optimization: {
      runtimeChunk: {
        name: 'common'
      },
      minimizer: [
        new TerserPlugin()
      ],
      splitChunks: {
        chunks: 'all',
        minSize: 0,
        maxAsyncRequests: Infinity,
        maxInitialRequests: Infinity,
        name: true,
        cacheGroups: {
          default: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 2,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            priority: -20,
            reuseExistingChunk: true
          },
          commons: {
            name: 'bundle',
            chunks: 'all',
            minChunks: 2,
            enforce: true,
            priority: -5
          },
          vendor: {
            chunks: 'initial',
            name: 'vendor',
            minChunks: 2,
            priority: -10,
            test: /node_modules\/(.*)\.js/
          }
        }
      }
    },
    plugins: [
      new DashboardPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(isDev ? 'development': 'production')
        }
      }),
      new HtmlWebpackPlugin({
        template: './index.html'
      }),
      ...(isDev ? [
        new webpack.HotModuleReplacementPlugin({
          // multiStep: true, // better performance with many files
        }),
        new webpack.NamedModulesPlugin(),
      ] : []),
      ...(isBuild ? [
        new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false
        })
      ] : [])
    ]
  }
}
