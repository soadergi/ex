import { createLoadable } from 'weplay-components/createLoadable'

export default createLoadable({
  loadModule: () => import(
    /* webpackPrefetch: true */
    './ProfilePage'// eslint-disable-line comma-dangle
  ),
})
