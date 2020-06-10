/* eslint-disable max-lines */
const path = require('path')

const sharp = require('responsive-loader/sharp')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer') //eslint-disable-line
const CompressionPlugin = require('compression-webpack-plugin')

const resolve = require('./webpack/resolve')
const stats = require('./webpack/stats')
const optimization = require('./webpack/optimization')
const htmlPluginConfig = require('./webpack/html-plugin/config')
const htmlPluginRuConfig = require('./webpack/html-plugin/ru.config')
const htmlPluginPlainConfig = require('./webpack/html-plugin/plain.config')

const ROOT_PATH = path.resolve(process.cwd())
const JS_DIR_NAME = 'js'
const mainSourceNames = [
  'weplay-core',
  'weplay-singleton',
  'weplay-components',
  'weplay-competitive',
  'weplay-media',
  'weplay-mini-games',
  'weplay-events',
  'weplay-platform',
]
// when issues with sprite on ubuntu
// https://github.com/imagemin/imagemin-mozjpeg/issues/26#issuecomment-369269277
const isProd = process.env.NODE_ENV === 'production'
const IS_SOURCEMAPS_ENABLED = process.env.IS_SOURCEMAPS_ENABLED === 'true'
const IS_MINIFICATION_ENABLED = process.env.IS_MINIFICATION_ENABLED === 'true'
const isAnalyze = process.env.ANALYZE === '1'
const isAnalytics = process.env.ANALYTICS === '1'
const isProdOrAnalyze = isProd || isAnalyze
// const isProd = true
const compression = process.env.COMPRESSION || ''
const cdnPath = process.env.CDN_PATH || '/'
const publicPath = compression ? `${cdnPath}${compression}/` : cdnPath
const DIST_DIR_NAME = compression ? `public/${compression}` : 'public'
const includeEvents = !process.env.TARGET_PACKAGE || process.env.TARGET_PACKAGE === 'events'
const includeTournaments = !process.env.TARGET_PACKAGE || process.env.TARGET_PACKAGE === 'tournaments'
const includeMedia = !process.env.TARGET_PACKAGE || process.env.TARGET_PACKAGE === 'media'

if (publicPath.slice(-1) !== '/') {
  throw new Error('CDN_PATH must contain slash at the end like'
    + ' https://cdn-weplay-test.azureedge.net/public/')
}
const spriteSource = [
  path.resolve(ROOT_PATH, 'node_modules/weplay-core/sprites'),
  path.resolve(ROOT_PATH, 'packages/weplay-core/sprites'),
]
const tabSize = 4
console.log('ENV VARS AVAILABLE FOR WEBPACK BUILD', JSON.stringify(process.env, null, tabSize))
const sources = [
  path.resolve(__dirname, 'src'),
  ...mainSourceNames.map(name => path.resolve(__dirname, `node_modules/${name}`)),
  ...mainSourceNames.map(name => path.resolve(__dirname, `packages/${name}`)),
]
const cacheAndThreadsLoaders = isProdOrAnalyze
  ? []
  : [
    'cache-loader',
    {
      loader: 'thread-loader',
      options: {
        poolTimeout: Infinity,
      },
    }]

const getFileLoaders = type => [
  {
    loader: 'file-loader',
    options: {
      name: isProd ? `${type}/[path][name].[hash:6].[ext]` : `${type}/[path][name].[ext]`,
    },
  },
]
const hashStrategy = '[contenthash:6]'
const devtool = (() => {
  if (!isProdOrAnalyze) {
    return 'cheap-module-eval-source-map'
  }
  if (!IS_SOURCEMAPS_ENABLED) {
    return false
  }
  return 'source-map'
})()
const config = {
  mode: isProd ? 'production' : 'development',
  entry: {
    polyfills: './webpack/polyfills.js',
    main: path.resolve(ROOT_PATH, './src/index.js'),
  },
  output: {
    path: path.resolve(ROOT_PATH, DIST_DIR_NAME),
    filename: isProd ? `${JS_DIR_NAME}/[name].${hashStrategy}.js` : `${JS_DIR_NAME}/[name].js`,
    chunkFilename: isProd ? `${JS_DIR_NAME}/[name].${hashStrategy}.js` : `${JS_DIR_NAME}/[name].js`,
    publicPath,
    pathinfo: !isProd,
  },
  resolve,
  optimization: optimization({
    isProdOrAnalyze,
    IS_SOURCEMAPS_ENABLED,
    IS_MINIFICATION_ENABLED,
  }),
  devtool,
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        include: sources.concat(spriteSource),
        use: cacheAndThreadsLoaders.concat([
          isProdOrAnalyze ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: IS_SOURCEMAPS_ENABLED,
              localIdentName: '[folder]--[local]__[hash:base64:2]',
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: sources,
            },
          },
        ]),
      },
      {
        test: /\.(js|jsx)$/,
        include: sources,
        use: cacheAndThreadsLoaders.concat([{
          loader: 'babel-loader',
          options: {
            // TODO: check if next line is needed?
            plugins: [
              '@babel/plugin-proposal-class-properties',
            ],
            cacheDirectory: true, // cahce load
            cacheCompression: false, // quicker
            // TODO: check if next line is needed? and file itself
            // TODO: create prod and dev builds
            configFile: path.resolve('babel.config.js'),
          },
        }]),
      },
      {
        test: /\.svg$/,
        include: spriteSource,

        use: [{
          loader: 'svg-sprite-loader',
        }],
      },

      {
        test: /\.(jpe?g|png)$/i,
        include: sources,
        exclude: spriteSource,

        use: [
          // image-webpack-loader removed because this functionality now covers aws-lambda-function
          // https://bitbucket.org/weplaymedia/aws-image-lambda/
          // responsive-loader exists only for placeholder https://weplayspace.atlassian.net/browse/WM-3914
          {
            loader: 'responsive-loader',
            options: {
              name: isProd ? 'img/[path][name].[hash:6].[ext]' : 'img/[path][name].[ext]',
              placeholder: true,
              adapter: sharp,
            },
          },
        ].filter(Boolean),
      },
      {
        test: /\.(gif|svg)$/i,
        include: sources,
        exclude: spriteSource,

        use: [
          ...getFileLoaders('img'),
          isProdOrAnalyze && {
            loader: 'image-webpack-loader',
            options: {
              gifsicle: {
                interlaced: false,
              },
            },
          }].filter(Boolean),
      },
      {
        test: /\.(mp3)$/,
        include: sources,
        use: getFileLoaders('sounds'),
      },
      {
        test: /\.(mov|mp4|webm)$/,
        include: sources,
        use: getFileLoaders('video'),
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      isProdOrAnalyze: JSON.stringify(isProdOrAnalyze),
    }),
    !includeEvents
      && new webpack.NormalModuleReplacementPlugin(/weplay-events\/pages\/index/, 'pages/_helpers/EmptyPage'),
    !includeTournaments
      && new webpack.NormalModuleReplacementPlugin(/weplay-competitive\/pages\/index/, 'pages/_helpers/EmptyPage'),
    !includeMedia
      && new webpack.NormalModuleReplacementPlugin(/weplay-media\/pages\/index/, 'pages/_helpers/EmptyPage'),
    new MomentLocalesPlugin({
      localesToKeep: ['ru'],
    }),
    new HtmlWebpackPlugin(htmlPluginConfig(isProd || isAnalytics)),
    new HtmlWebpackPlugin({
      ...htmlPluginConfig(isProd || isAnalytics),
      ...htmlPluginRuConfig(isProd || isAnalytics),
    }),
    new HtmlWebpackPlugin(htmlPluginPlainConfig(isProd || isAnalytics)),
    isProdOrAnalyze && new MiniCssExtractPlugin({
      filename: isProd ? `css/[name].${hashStrategy}.css` : 'css/[name].css',
      chunkFilename: isProd ? `css/[name].${hashStrategy}.css` : 'css/[name].css',
      ignoreOrder: true, // Disable to add warnings about conflicting order
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async',
      inline: ['runtime'],
      // prefetch: {
      //   test: /\.js$/,
      //   chunks: 'async',
      // },
      preload: {
        // eslint-disable-next-line
        test: /polyfills|main|initialSyncChunk|reactReactDom|stomp|sockjs-client|lodash-es|moment|formik|json3|MainContent/,
        chunks: 'all',
      },
    }),
    // ImageminWebpWebpackPlugin removed because this functionality now covers aws-lambda-function
    // https://bitbucket.org/weplaymedia/aws-image-lambda/
    isAnalyze && new BundleAnalyzerPlugin(),
    //   new webpack.debug.ProfilingPlugin({
    //     outputPath: 'profiling.json',
    //   }),
    // isProdOrAnalyze &&
    isProd && !compression && new CompressionPlugin({
      cache: true,
      filename: '[path]',
      algorithm: 'brotliCompress',
      test: /\.(js|css|map)$/,
      compressionOptions: { level: 11 },
      threshold: 0,
      // force all chunks to compress,
      // for easier deploy
      minRatio: Infinity,
      deleteOriginalAssets: false,
    }),
    isProd && compression === 'br' && new CompressionPlugin({
      cache: true,
      filename: '[path]',
      algorithm: 'brotliCompress',
      test: /\.(js|css|map)$/,
      compressionOptions: { level: 11 },
      threshold: 0,
      // force all chunks to compress,
      // for easier deploy
      minRatio: Infinity,
      deleteOriginalAssets: false,
    }),
    isProd && compression === 'gz' && new CompressionPlugin({
      cache: true,
      filename: '[path]',
      algorithm: 'gzip',
      test: /\.(js|css|map)$/,
      threshold: 0,
      // force all chunks to compress,
      // for easier deploy
      minRatio: Infinity,
      deleteOriginalAssets: false,
    }),
    new CopyPlugin([
      'serviceWorker.js',
      'manifest.json',
      { from: 'src/favicons', to: './favicons' },
    ]),
  ].filter(Boolean),
  stats,
  devServer: {
    contentBase: path.join(__dirname, DIST_DIR_NAME),
    watchOptions: {
      // eslint-disable-next-line max-len
      ignored: /node_modules\/(?!weplay-components|weplay-core|weplay-singleton|weplay-competitive|weplay-media|weplay-mini-games|weplay-events|weplay-platform).*/,
    },
    // compress: true,
    historyApiFallback: true,
    open: true,
    overlay: {
      errors: true,
    },
    proxy: {
      // Will be not needed after CDN migration
      '/api': {
        target: 'https://development.weplay.space',
        secure: false,
      },
    },
    disableHostCheck: true,
    writeToDisk: true,
  },
}

module.exports = config

// before migration to webpack 5
// mini-css-extract-plugin not working https://github.com/webpack-contrib/mini-css-extract-plugin/issues/330
// webpack dev server not working https://github.com/webpack/webpack-dev-middleware/issues/435
// - BOTH FIXED

// https://github.com/webpack/webpack/issues/9802#issuecomment-542647047
// https://github.com/jantimon/html-webpack-plugin/issues/1129 - not working yet
// - NOT FIXED
