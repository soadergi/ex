import {
  compose,
  withStateHandlers,
  withHandlers,
  lifecycle,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'
import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
import { addBodyOverflow, removeBodyOverflow } from 'weplay-core/helpers/toggleBodyOverflow'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    globalScope: globalScopeSelector,
    isMobileWidth: isMobileWidthSelector,
  }), {
    // actionCreators
  }),

  withHandlers(() => {
    let triggerEl

    return {
      saveTriggerRef: () => (ref) => { triggerEl = ref },
      getTriggerRef: () => () => triggerEl,
    }
  }),
  withStateHandlers({
    isPopupVisible: false,
  }, {
    togglePopupVisibility: ({ isPopupVisible }) => () => ({
      isPopupVisible: !isPopupVisible,
    }),
    closePopup: () => () => ({
      isPopupVisible: false,
    }),
  }),

  withHandlers({
    handlePopupToggle: props => () => {
      props.togglePopupVisibility()
      if (!props.centered && props.isMobileWidth) {
        addBodyOverflow()
      }
    },
    handleClose: props => () => {
      props.closePopup()
      if (!props.centered && props.isMobileWidth) {
        removeBodyOverflow()
      }
    },
    closePopupOnResize: ({ closePopup, isMobileWidth }) => () => {
      if (!isMobileWidth) {
        closePopup()
      }
    },
  }),

  lifecycle({
    componentDidMount() {
      const { globalScope, closePopupOnResize } = this.props

      globalScope.addEventListener('resize', closePopupOnResize)
    },

    componentWillUnmount() {
      const { globalScope, closePopupOnResize } = this.props

      globalScope.removeEventListener('resize', closePopupOnResize)
    },
  }),
)

export default container
