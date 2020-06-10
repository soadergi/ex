import withRouter from 'weplay-singleton/RouterProvider/withRouter'
import {
  compose,
  withProps,
  withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { setModalViewedStatus } from 'weplay-core/helpers/modalStorageUtils'
import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { openLoginModal, triggerMutualModal } from 'weplay-core/reduxs/_legacy/modals/actions'
import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'
import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import logo from 'weplay-core/img/logo-v2.svg'
import { goTo, NAMES } from 'weplay-core/routes'
import { MUTUAL_MODALS } from 'weplay-components/ModalBase/config'

import points from '../img/Points.svg'

import modalBackground from './img/onboarding_back.svg'

const container = compose(
  withRouter,
  connect(createStructuredSelector({
    // selectors
    globalScope: globalScopeSelector,
    i18nTexts: i18nTextsSelector,
    isLoggedIn: isLoggedInSelector,
  }), {
    // actionCreators
    triggerMutualModal,
    openLoginModal,
  }),

  withProps({
    images: {
      logo,
      points,
    },
    blockInlineStyles: {
      backgroundImage: `url('${modalBackground}')`,
    },
  }),

  withHandlers(({
    history,
    globalScope,
    triggerMutualModal, // eslint-disable-line no-shadow
    openLoginModal, // eslint-disable-line no-shadow
  }) => {
    const setModalVisibilityStatement = () => {
      setModalViewedStatus(globalScope, MUTUAL_MODALS.ONBOARDING_WP_POINTS)
      triggerMutualModal(null)
    }
    return {
      handleSkipButtonClick: () => () => {
        setModalVisibilityStatement()
      },
      handleContinueButtonClickWithLogin: () => () => {
        setModalVisibilityStatement()
        history.push({
          ...history.location,
          state: {
            prevPage: NAMES.PROFILE,
          },
        })
        openLoginModal()
      },
      handleContinueButtonClick: () => () => {
        setModalVisibilityStatement()
        goTo({
          history,
          name: NAMES.PROFILE,
        })
      },
    }
  }),
)

export default container
