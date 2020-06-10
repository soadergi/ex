// TODO: This mocked API has been created while we haven't real API for Footer config
// TODO: When we'll have real API this config must die!

import { localizeWith } from 'weplay-core/reduxs/helpers'

import common from './common'
import media from './media'
import events from './events'
import tournaments from './tournaments'
import rules from './rules'

const footerMenu = {
  common,
  media,
  events,
  tournaments,
  rules,
}

export const getFooterMenu = (language, dataKey) => {
  const menu = footerMenu[dataKey]
  return menu.map(localizeWith(language))
}
