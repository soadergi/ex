import * as R from 'ramda'
import { connect } from 'react-redux'
import {
  compose, withHandlers, withStateHandlers,
} from 'recompose'
import { createStructuredSelector } from 'reselect'
import { isCyrillic } from 'weplay-core/helpers/isCyrillic'
import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import { triggerLoginModal, openLoginModal } from 'weplay-core/reduxs/_legacy/modals/actions'
import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import withAnalytics from 'weplay-core/HOCs/withAnalytics'

import { activateCodeAndShowPopup } from './actionChains'

export const isValidPromoCode = R.allPass([
  Boolean,
  str => /^(?=\d*[A-Z]\d*$)[A-Z\d]{5}$/.test(str),
  R.complement(isCyrillic),
])

const container = compose(
  withAnalytics,
  connect(createStructuredSelector({
    i18nTexts: i18nTextsSelector,
    isLoggedIn: isLoggedInSelector,
  }), {
    triggerLoginModal,
    openLoginModal,
    activateCodeAndShowPopup,
  }),
  withStateHandlers({
    isCodeValid: true,
    code: '',
  }, {
    handleBlur: () => event => ({
      isCodeValid: isValidPromoCode(event.target.value.trim()),
    }),
    handleChange: () => event => ({
      isCodeValid: true,
      code: event.target.value,
    }),
  }),

  withHandlers({
    activateCode: props => () => {
      const {
        isLoggedIn,
        isCodeValid,
        registrationSource,
      } = props
      if (!isLoggedIn) {
        props.openLoginModal({ registrationFrom: registrationSource })
      } else if (isCodeValid) {
        props.activateCodeAndShowPopup({
          code: props.code.trim(),
        })
        props.logAnalytics({
          eventCategory: 'Promocodes',
          eventAction: 'Promocode send',
          eventLabel: `${props.startcasePageName} landing`,
          virtualPage: '/virtual/forge-of-masters/promocode_send', // TODO: think about next events
        })
      }
    },
  }),

  withHandlers({
    handleKeyDown: ({ activateCode }) => (event) => {
      if (event.keyCode === 13) {
        activateCode()
      }
    },
  }),
)

export default container
