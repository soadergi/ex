// eslint-disable-next-line import/no-extraneous-dependencies
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// eslint-disable-next-line import/no-extraneous-dependencies
const TerserPlugin = require('terser-webpack-plugin')

const simpleCacheGroups = require('./simpleCacheGroups')

const splitChunks = {
  chunks: 'async',
  minSize: 30000,
  maxSize: 0,
  minChunks: 1,
  maxAsyncRequests: 5,
  maxInitialRequests: 3,
  automaticNameDelimiter: '&&',
  // ==== remove when migrating to webpack 5
  name: true,
  // ==== remove when migrating to webpack 5
  cacheGroups: {
    ...simpleCacheGroups,
    initialSyncChunk: {
      priority: 2,
      // TODO: remove react-custom-scrollbars from here, if removed from select
      // eslint-disable-next-line max-len
      test: /[\\/]node_modules[\\/](ramda|lodash|react-router|react-router-dom|react-custom-scrollbars|prop-types|recompose|history|classnames|)[\\/]/,
      chunks: 'all',
      maxInitialRequests: Infinity,
      maxSize: Infinity,
      minSize: 0,
      name: 'npm/custom/initialSyncChunk',
    },
    reactReactDom: {
      priority: 2,
      test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
      chunks: 'all',
      maxInitialRequests: Infinity,
      maxSize: Infinity,
      minSize: 0,
      name: 'npm/custom/reactReactDom',
    },
    // THIS CHUNK MOVE OUT ALL NODE MODULES FROM ASYNC PARTS - SO THEY WON"T BE BUNDELED TO
    // MAIN NEITHER TO ASYNC ITSELF
    asyncNodeModules: {
      priority: 1,
      // eslint-disable-next-line max-len
      test: /node_modules\/(?!weplay-components|weplay-core|weplay-singleton|weplay-competitive|weplay-media|weplay-mini-games|weplay-events|weplay-platform)/,
      chunks: 'async',
      maxInitialRequests: Infinity,
      minSize: 1000,
      name(module) {
        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
        // fix for supporting async loading of react-share (some trouble with webpack production build)
        // can be reproduced with yarn production locally
        if (packageName === 'babel-runtime') {
          return 'babel'
        }
        return `npm/async/${packageName.replace('@', '')}`
      },
    },
    // mainNodeModule: {
    //   priority: 1,
    //   test: /[\\/]node_modules[\\/]/,
    //   chunks: 'initial',
    //   maxInitialRequests: Infinity,
    //   minSize: 10 * 1000,
    //   name: 'npm/main-sync-chunk',
    // },
    // ===== DEFAULTS =====
    // vendors: {
    //   test: /[\\/]node_modules[\\/]/,
    //   priority: -10,
    // },
    // default: {
    //   minChunks: 2,
    //   priority: -20,
    //   reuseExistingChunk: true,
    // },
    // ===== DEFAULTS =====
  },
}
module.exports = ({
  isProdOrAnalyze,
  IS_SOURCEMAPS_ENABLED,
  IS_MINIFICATION_ENABLED,
}) => ({
  runtimeChunk: 'single',
  // ==== remove when migrating to webpack 5
  moduleIds: 'hashed',
  namedChunks: true,
  // ==== remove when migrating to webpack 5
  minimizer: IS_MINIFICATION_ENABLED ? [
    new TerserPlugin({
      cache: true,
      sourceMap: IS_SOURCEMAPS_ENABLED,
      // TODO: hangs prod build
      // parallel: true,
      terserOptions: {
        output: {
          comments: false,
        },
      },
    }),
  ] : [],
  splitChunks: isProdOrAnalyze ? splitChunks : false,
  ...!isProdOrAnalyze && ({
    removeAvailableModules: false,
    removeEmptyChunks: false,
  }),
})
