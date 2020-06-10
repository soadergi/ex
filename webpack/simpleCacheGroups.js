const createSimpleCacheGroup = name => ({
  [name]: {
    priority: 2,
    test: module => module.context && module.context.includes(name),
    chunks: 'all',
    maxInitialRequests: Infinity,
    maxSize: Infinity,
    minSize: 0,
    name: `npm/custom/${name}`,
  },
})

const simpleCacheGroupNames = [
  // 'moment',
  // 'lodash',
  // 'gsap',
  // 'ramda',
  // 'react-router',
  // 'prop-types',
  // 'react-custom-scrollbars',
  // 'recompose',
  // 'axios',
  // 'history',
  // 'classnames',
  // 'yup',
  // 'formik',
  // 'weplay-core',
  // 'weplay-components',
  // 'weplay-competitive',
  // 'sockjs',
  // 'stomp',
]

const simpleCacheGroups = simpleCacheGroupNames.reduce((acc, name) => ({
  ...acc,
  ...createSimpleCacheGroup(name),
}), {})

module.exports = simpleCacheGroups
