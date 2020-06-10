import loadable from '@loadable/component'

export default loadable(() => import(

  './index' // eslint-disable-line
))
