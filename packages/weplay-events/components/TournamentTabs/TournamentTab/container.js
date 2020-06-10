import * as R from 'ramda'
import _ from 'lodash'
import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

import { tournamentTitleSelector } from 'weplay-events/reduxs/tournaments/reducer'

const container = compose(
  connect(createStructuredSelector({
    i18nTexts: i18nTextsSelector,
    tournamentTitle: tournamentTitleSelector,
  }), {
    // actionCreators
  }),
  withPropsOnChange([
    'i18nTexts',
    'tab',
    'tournamentTitle',
  ], ({
    i18nTexts,
    tab,
    tournamentTitle,
  }) => ({
    activeStageTexts: R.pathOr({}, [
      _.camelCase(tournamentTitle),
      'mainBanner',
      'stages',
      tab.id,
    ], i18nTexts),
  })),
)

export default container
