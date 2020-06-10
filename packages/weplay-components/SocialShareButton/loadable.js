import { createLoadable } from 'weplay-components/createLoadable'

export default createLoadable({
  loadModule: () => import(

    /* webpackPrefetch: true */
    './index' // eslint-disable-line comma-dangle
  ),
  offset: 100,
  skeletonOptions: {
    round: true,
    width: '50px',
    height: '50px',
  },
})
