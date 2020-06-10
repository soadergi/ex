const path = require('path')

const withSass = require('@zeit/next-sass')
const withTM = require('next-transpile-modules')
const { withPlugins } = require('next-compose-plugins')

const weplayPackages = [
  'b2b-service',
  'weplay-singleton',
  'weplay-core',
  'weplay-components',
  'weplay-media',
  'weplay-competitive',
  'weplay-events',
  'weplay-platform',
]
const include = weplayPackages.flatMap(packageName => [
  path.resolve(__dirname, `../../node_modules/${packageName}`),
  path.resolve(__dirname, `./node_modules/${packageName}`),
  path.resolve(__dirname, `../${packageName}`),
  path.resolve(__dirname, './src'),
  path.resolve(__dirname, './pages'),
])
const sprites = [
  path.resolve(__dirname, '../../node_modules/weplay-core/sprites'),
  path.resolve(__dirname, './node_modules/weplay-core/sprites'),
  path.resolve(__dirname, '../weplay-core/sprites'),
]
module.exports = withPlugins([
  [withTM, {
    transpileModules: [
      'react-redux',
      'lodash-es',
      'ramda/es',
      'redux-actions',
      ...weplayPackages,
    ],
  }],
  [withSass, {
    cssModules: true,
    cssLoaderOptions: {
      localIdentName: '[folder]--[local]__[hash:base64:2]',
    },
    sourceMap: true,
    sassLoaderOptions: {
      includePaths: [
        path.resolve(__dirname, '../../node_modules'),
        path.resolve(__dirname, '../'),
        path.resolve(__dirname, './node_modules'),
        path.resolve(__dirname, './'),
      ],
    },
  }],
], {
  webpack: (config, { isServer }) => {
    try {
      const nextBabelConfig = config.module.rules[0] // for most of the files
      const tmBabelConfig = config.module.rules[4] // for our weplay-packages and es6 packages
      tmBabelConfig.loader.options.plugins = [
        ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
        ['@babel/plugin-proposal-optional-chaining'],
        ['@babel/plugin-proposal-throw-expressions'],
        ['@babel/plugin-proposal-nullish-coalescing-operator'],
        ['@babel/plugin-proposal-export-default-from'],
      ]
      // ===== SCSS + SASS
      /* eslint-disable no-param-reassign */
      config.module.rules[2].include = include
      config.module.rules[3].include = include
      // ===== SCSS + SASS

      config.resolve.modules.push(path.resolve(__dirname, './src'))
      config.resolve.modules.push(path.resolve(__dirname, './config'))
      config.resolve.extensions.push('.scss')
      nextBabelConfig.exclude = (paths) => {
        if (
          /next-server[\\/]dist[\\/]lib/.test(paths)
          || /next[\\/]dist[\\/]client/.test(paths)
          || /next[\\/]dist[\\/]pages/.test(paths)
          || /[\\/](strip-ansi|ansi-regex)[\\/]/.test(paths)
        ) {
          return false
        }
        if (weplayPackages.reduce((isWeplayPack, packageName) => isWeplayPack || paths.includes(packageName), false)) {
          return false
        }
        return /node_modules/.test(paths)
      }

      config.module.rules.push({
        test: /\.svg$/,
        include: sprites,
        loader: 'svg-sprite-loader',
        options: {
          extract: false,
        },
      })

      config.module.rules.push({
        test: /\.(jpe?g|png|svg|gif|ico|webp)$/,
        exclude: sprites,
        include,
        use: [
          {
            loader: require.resolve('url-loader'),
            options: {
              limit: 8192,
              fallback: require.resolve('file-loader'),
              publicPath: '/_next/static/images/',
              outputPath: `${isServer ? '../' : ''}static/images/`,
              name: '[name]-[hash].[ext]',
            },
          },
        ],
      })

      return config
    } catch (err) {
      console.error('webpack: (config, { isServer }) - error', err)
      process.exit(1)
      throw new Error()
    }
  },
})
