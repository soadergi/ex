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
        id: 'fullBracket',
        title: i18nTexts.tournamentStages.radiant.playOffTabs.fullBracket.title,
      },
      {
        id: 'westernBracket',
        title: i18nTexts.tournamentStages.radiant.playOffTabs.westernBracket.title,
      },
      {
        id: 'easternBracket',
        title: i18nTexts.tournamentStages.radiant.playOffTabs.easternBracket.title,
      },
      {
        id: 'superFinal',
        title: i18nTexts.tournamentStages.radiant.playOffTabs.superFinal.title,
      },
    ],
  })),

  withTabs,
)

export default container
