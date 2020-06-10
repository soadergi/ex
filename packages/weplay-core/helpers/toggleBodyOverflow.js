import * as R from 'ramda'

import getBrowserGlobal from 'weplay-core/helpers/ssr/getBrowserGlobal'

const body = R.path(['document', 'body'], getBrowserGlobal())
const html = R.path(['document', 'documentElement'], getBrowserGlobal())

export const addBodyOverflow = () => {
  if (body && html) {
    body.classList.add('bodyOverflowHidden')
    html.classList.add('bodyOverflowHidden')
  }
}

export const removeBodyOverflow = () => {
  if (body && html) {
    body.classList.remove('bodyOverflowHidden')
    html.classList.remove('bodyOverflowHidden')
  }
}
