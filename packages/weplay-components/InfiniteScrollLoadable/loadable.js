import { createLoadable } from 'weplay-components/createLoadable'

export default createLoadable({
  loadModule: () => import(

    /* webpackPrefetch: true */
    'react-infinite-scroller' // eslint-disable-line comma-dangle
  ),
  fallback: null,
})
