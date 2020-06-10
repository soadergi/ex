import { compose } from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

import {
  tournamentPlayersByGroupNamesSelector,
} from 'weplay-events/reduxs/tournaments/reducer'

const GROUP_NAMES = ['Vicious Order', 'Crimson Gang']

const container = compose(
  connect(createStructuredSelector({
    i18nTexts: i18nTextsSelector,
    isMobileWidth: isMobileWidthSelector,
    tournamentPlayers: tournamentPlayersByGroupNamesSelector(GROUP_NAMES),
  }), {
    // actionCreators
  }),
)

export default container
