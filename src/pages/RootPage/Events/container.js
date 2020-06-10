import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { currentLanguageSelector } from 'weplay-core/reduxs/language/reducer'
import { getActiveTournamentLiveStreamSelector } from 'weplay-core/reduxs/activeTournament/selectors'
import { getEventsList } from 'weplay-core/consts/eventCards'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    currentLanguage: currentLanguageSelector,
    activeTournament: getActiveTournamentLiveStreamSelector,
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'currentLanguage',
  ], ({
    currentLanguage,
  }) => ({
    promoEvents: getEventsList(currentLanguage),
  })),

  withPropsOnChange([
    'activeTournament',
  ], ({
    activeTournament,
  }) => ({
    isStreamPlayerVisible: Boolean(activeTournament.liveStreamUrl),
  })),
)

export default container
