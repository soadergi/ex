import { createLoadable } from 'weplay-components/createLoadable'

export default createLoadable({
  loadModule: () => import(

    /* webpackPrefetch: true */
    './FooterSubscribeFormPortal'// eslint-disable-line comma-dangle
  ),
  fallback: null,
})
