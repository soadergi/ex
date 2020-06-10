import { createLoadable } from 'weplay-components/createLoadable'

export default createLoadable({
  loadModule: () => import(

    'weplay-media/components/Newsfeed/index' // eslint-disable-line
  ),
})
