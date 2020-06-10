import {
  compose,
  withHandlers,
  withPropsOnChange,
  lifecycle,
  withStateHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'

import { withOnClickOutside } from '../../withOnClickOutside'

const ADDITIONAL_MARGIN = 30

const container = compose(
  connect(createStructuredSelector({
    // selectors
    globalScope: globalScopeSelector,
  }), {
    // actionCreators
  }),

  withHandlers(() => {
    let popupContentEl

    return {
      savePopupContentRef: () => (ref) => { popupContentEl = ref },
      getPopupContentRef: () => () => popupContentEl,
    }
  }),

  withStateHandlers({
    popupContentDimensions: null,
  }, {
    setPopupContentDimensions: () => popupContentDimensions => ({
      popupContentDimensions,
    }),
  }),

  withHandlers(({ setPopupContentDimensions, getPopupContentRef }) => {
    const observerCallback = (mutationsList) => {
      mutationsList.forEach((mutation) => {
        if (mutation.type === 'childList') {
          setPopupContentDimensions(getPopupContentRef().getBoundingClientRect())
        }
      })
    }

    const observer = new MutationObserver(observerCallback)

    return {
      getPopupContentObserver: () => () => observer,
    }
  }),

  withPropsOnChange([
    'getTriggerRef',
    'savePopupContentRef',
    'popupContentDimensions',
    'centered',
  ], ({
    getTriggerRef,
    globalScope,
    popupContentDimensions,
    centered,
  }) => {
    const triggerDimensions = getTriggerRef().getBoundingClientRect()
    const triggerPositionTop = triggerDimensions.top
    const triggerPositionLeft = triggerDimensions.left

    let popupContentWidth = 0
    let popupContentHeight = 0
    if (popupContentDimensions) {
      popupContentWidth = popupContentDimensions.width
      popupContentHeight = popupContentDimensions.height
    }

    let left = triggerPositionLeft + globalScope.pageXOffset - popupContentWidth + triggerDimensions.width

    if (centered) {
      left -= triggerDimensions.width / 2
    }

    if (triggerPositionTop + popupContentHeight + ADDITIONAL_MARGIN > globalScope.innerHeight) {
      return {
        popupPosition: {
          top: triggerPositionTop + globalScope.pageYOffset - triggerDimensions.height - popupContentHeight,
          left,
        },
      }
    }

    return {
      popupPosition: {
        top: triggerPositionTop + globalScope.pageYOffset + triggerDimensions.height,
        left,
      },
    }
  }),

  withHandlers({
    handleClickOutside: props => (e) => {
      if (!props.getTriggerRef().contains(e.target)) {
        props.closePopup()
      }
    },
  }),

  withOnClickOutside,

  lifecycle({
    componentDidMount() {
      const { getPopupContentRef, setPopupContentDimensions, getPopupContentObserver } = this.props

      const observerConfig = { childList: true, subtree: true }

      getPopupContentObserver().observe(getPopupContentRef(), observerConfig)

      setPopupContentDimensions(getPopupContentRef().getBoundingClientRect())
    },

    componentWillUnmount() {
      this.props.getPopupContentObserver().disconnect()
    },
  }),
)

export default container
