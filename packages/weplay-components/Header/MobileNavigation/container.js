import {
  compose,
  withHandlers, withStateHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import {
  isMobileWidthSelector,
  isTabletWidthSelector,
} from 'weplay-core/reduxs/_legacy/layout/reducer'

import { withOnClickOutside } from '../../withOnClickOutside'

const container = compose(
  withRouter,
  connect(createStructuredSelector({
    // selectors
    isMobileWidth: isMobileWidthSelector,
    isTabletWidth: isTabletWidthSelector,
  }), {
    // actionCreators
  }),
  withStateHandlers({
    isMenuOpened: false,
  }, {
    toggleMenu: ({ isMenuOpened }) => () => ({
      isMenuOpened: !isMenuOpened,
    }),
    closeMenu: () => () => ({
      isMenuOpened: false,
    }),
  }),

  withHandlers({
    handleClickOutside: ({
      closeMenu,
      isMenuOpened,
    }) => () => {
      if (isMenuOpened) closeMenu()
    },
  }),
  withOnClickOutside,
)

export default container
