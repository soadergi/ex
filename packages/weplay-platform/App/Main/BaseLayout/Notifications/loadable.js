import loadable from '@loadable/component'

export default loadable(() => import(

  /* webpackPrefetch: true */
  './index'// eslint-disable-line comma-dangle
))
