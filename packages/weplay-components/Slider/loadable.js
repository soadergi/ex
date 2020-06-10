import { createLoadable } from 'weplay-components/createLoadable'

export default createLoadable({
  loadModule: () => import(

    /* webpackPrefetch: true */
    './index' // eslint-disable-line comma-dangle
  ),
  fallback: null,
})
