import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { currentLanguageSelector } from 'weplay-core/reduxs/language/reducer'

import { socialLinks } from 'weplay-components/SocialLinks/socialLinks'

import { russianExtraSocialLinkPaths } from './constants'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    currentLanguage: currentLanguageSelector,
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'currentLanguage',
    'promo',
  ], ({
    currentLanguage,
    promo,
  }) => {
    const promoSocialLinks = socialLinks.map(link => (
      promo
        ? {
          analyticEventLabel: link.analyticEventLabel,
          icon: link.promoIcon || link.icon,
          path: link.path[currentLanguage],
        }
        : {
          ...link,
          path: link.path[currentLanguage],
        }
    ))
    const links = currentLanguage === 'ru'
      ? promoSocialLinks
      : promoSocialLinks.filter(link => !russianExtraSocialLinkPaths.includes(link.path))

    return ({
      links,
    })
  }),
)

export default container
