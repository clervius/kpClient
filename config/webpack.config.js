const path = require('path')
const webpack = require('webpack')
const DashboardPlugin = require('webpack-dashboard/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
  console.log({ env })

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
        use: [ 'style-loader', 'css-loader' ]
      }, {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
            }
        }]
    }
    ]
    },
    plugins: [
      new DashboardPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(isDev ? 'development': 'production')
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: (module) => module.context && module.context.indexOf('node_modules') !== -1,
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest'
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
        }),
        new webpack.optimize.UglifyJsPlugin({
          beautify: false,
          compress: {
            screw_ie8: true
          },
          comments: false,
          sourceMap: isSourceMap,
        }),
      ] : []),
    ]
  }
}
