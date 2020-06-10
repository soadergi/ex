import * as R from 'ramda'
import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  i18nTextsSelector,
} from 'weplay-core/reduxs/language/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'stats',
    'candidate',
  ], ({
    stats,
    candidate,
  }) => ({
    avatar: R.pathOr('', ['extra', 'teamAvatarUrl'], candidate),
    kda: `${R.propOr(0, 'kills', stats)}/${R.propOr(0, 'deaths', stats)}/${R.propOr(0, 'assists', stats)}`,
    winRate: Math.round(Number(R.propOr(0, 'winrate', stats)) * 100),
  })),
)

export default container
