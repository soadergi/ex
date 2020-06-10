import {
  compose,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import { openLoginModal, triggerSignUpModal } from 'weplay-core/reduxs/_legacy/modals/actions'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
  }), {
    // actionCreators
    openLoginModal,
    triggerSignUpModal,
  }),
)

export default container
