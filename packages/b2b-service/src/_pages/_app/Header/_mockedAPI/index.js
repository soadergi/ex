import * as R from 'ramda'

import { localizeWith } from 'weplay-core/reduxs/helpers'

import eventsList from './config/eventsData'
import socialLinks from './config/socialLinks'

export const getSocialLinks = (language, dataKey) => socialLinks[dataKey][language]
export const getEventsList = language => R.map(localizeWith(language))(eventsList)
