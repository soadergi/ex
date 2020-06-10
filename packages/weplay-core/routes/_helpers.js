import * as R from 'ramda'

import config from '../config'

export const getLanguageFromLocation = R.pipe(
  R.prop('pathname'),
  R.split('/'),
  R.prop(1),
  R.ifElse(
    language => config.languages.includes(language),
    R.identity,
    R.always(config.languages[0]),
  ),
)
export const getPrefix = currentLang => (currentLang !== 'en' ? `/${currentLang}` : '')

export const trimResidualSlash = text => (
  text.endsWith('/') && text.length > 1
    ? text.slice(0, text.length - 1)
    : text
)
