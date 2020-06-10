import * as R from 'ramda'
import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

const container = compose(
  connect(createStructuredSelector({
    i18nTexts: i18nTextsSelector,
    // selectors
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'player',
  ], ({
    player,
  }) => ({
    playerSocials: R.pipe(
      R.propOr([], 'social'),
      R.filter(
        R.pipe(
          R.isEmpty,
          R.not,
        ),
      ),
      R.pick(['facebook', 'twitch', 'twitter']),
      socials => Object.keys(socials).map(key => ({
        icon: key,
        path: socials[key],
        analyticEventLabel: key,
      })),
    )(player),
  })),
)

export default container
