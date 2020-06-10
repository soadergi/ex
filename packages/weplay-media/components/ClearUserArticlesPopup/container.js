import {
  compose,
  withHandlers,
  withStateHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  currentLanguageSelector,
} from 'weplay-core/reduxs/language/reducer'
import withRouteInfo from 'weplay-core/routes/withRouteInfo'

const container = compose(
  connect(createStructuredSelector({
    currentLanguage: currentLanguageSelector,
  }), {
  }),
  // TODO: @Andrew, see do we need withRouteInfo here or not
  withRouteInfo,
  withStateHandlers({
    currentStep: 'clearArticles',
  }, {
    setCurrentStep: () => nextStep => ({
      currentStep: nextStep,
    }),
  }),

  withHandlers({
    handleClosePopup: props => () => {
      props.closePopup()
    },
    handleDeleteBookmarks: props => () => {
      props.closePopup()
      props.deleteUserArticles({ language: props.currentLanguage })
    },
  }),

)

export default container
