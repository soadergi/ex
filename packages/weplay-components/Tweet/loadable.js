import { createLoadable } from 'weplay-components/createLoadable'

export default createLoadable({
  loadModule: () => import(

    /* webpackPrefetch: true */
    './index' // eslint-disable-line comma-dangle
  ),
  skeletonOptions: {
    count: 3,
  },
})
