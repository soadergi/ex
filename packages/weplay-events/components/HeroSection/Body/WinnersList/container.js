import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

import { MVPSelector } from 'weplay-events/reduxs/tournaments/reducer'
import { TUG_OF_WAR_STAGE_NAMES } from 'weplay-events/pages/TugOfWarPage/consts'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
    MVP: MVPSelector,
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'MVP',
    'tournamentTitle',
  ], ({
    MVP,
    tournamentTitle,
  }) => ({
    withMVP: Boolean(MVP.prize && (tournamentTitle !== TUG_OF_WAR_STAGE_NAMES.DIRE)),
  })),
)

export default container
