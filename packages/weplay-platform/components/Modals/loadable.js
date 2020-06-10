import { createLoadable } from 'weplay-components/createLoadable'

export default createLoadable({
  loadModule: () => import(

    /* webpackPreload: true */
    './index' // eslint-disable-line comma-dangle
  ),
  fallback: null,
  isLazyLoading: false,
})
