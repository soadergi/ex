import { createLoadable } from 'weplay-components/createLoadable'

export default createLoadable({
  loadModule: () => import(

    /* webpackPrefetch: true */
    './IframePost' // eslint-disable-line comma-dangle
  ),
})
