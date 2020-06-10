import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

import withTabs from 'weplay-components/withTabs'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'i18nTexts',
  ], ({
    i18nTexts,
  }) => ({
    tabs: [
      {
        id: 'Americas',
        title: i18nTexts.tournamentStages.dire.playOffTabs.fullBracket.title,
      },
      {
        id: 'Asia',
        title: i18nTexts.tournamentStages.dire.playOffTabs.westernBracket.title,
      },
    ],
  })),

  withTabs,
)

export default container
