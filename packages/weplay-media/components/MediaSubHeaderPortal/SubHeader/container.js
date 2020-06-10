import * as R from 'ramda'
import {
  compose,
  withStateHandlers,
  withHandlers,
  lifecycle,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'
import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import { windowWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'

const menuWidthTimeout = 200
const container = compose(
  withRouter,
  withLocale,
  connect(createStructuredSelector({
    // selectors
    windowWidth: windowWidthSelector,
    globalScope: globalScopeSelector,
  }), {
    // actionCreators
  }),

  withStateHandlers({
    primaryMenu: [],
    secondaryMenu: [],
    moreMenu: [],
  }, {
    updateMenus: () => menus => ({
      ...menus,
    }),
  }),

  withHandlers(() => {
    let menuLine
    return {
      handleMenuLineRef: () => (menuLineRef) => { menuLine = menuLineRef },
      handleMenuWidth: ({
        windowWidth,
        primaryMenu,
        secondaryMenu,
        moreMenu,
        updateMenus,
      }) => () => {
        if (!menuLine) return
        const isMenuNeedRecomposing = (windowWidth < menuLine.offsetWidth) && (primaryMenu.length > 1)
        if (!isMenuNeedRecomposing) return
        if (R.isEmpty(secondaryMenu)) {
          updateMenus({
            primaryMenu: R.init(primaryMenu),
            moreMenu: R.prepend(R.last(primaryMenu), moreMenu),
          })
        } else {
          updateMenus({
            secondaryMenu: [],
            moreMenu: secondaryMenu,
          })
        }
      },
      resetMenusToDefault: ({
        projectMenu,
        profileMenu,
        updateMenus,
      }) => () => {
        updateMenus({
          primaryMenu: projectMenu,
          secondaryMenu: profileMenu,
          moreMenu: [],
        })
      },
    }
  }),

  lifecycle({
    componentDidMount() {
      this.props.resetMenusToDefault()

      setTimeout(this.props.handleMenuWidth, menuWidthTimeout) // this needs to correctly render on localhost
    },

    componentDidUpdate(prevProps) {
      if ((this.props.windowWidth && prevProps.windowWidth !== this.props.windowWidth)
        || !R.equals(prevProps.moreMenu, this.props.moreMenu)
        || !R.equals(prevProps.secondaryMenu, this.props.secondaryMenu)
      ) {
        this.props.handleMenuWidth()
      }
      if ((prevProps.windowWidth < this.props.windowWidth)
        || !R.equals(prevProps.projectMenu, this.props.projectMenu)
        || !R.equals(prevProps.profileMenu, this.props.profileMenu)
      ) {
        this.props.resetMenusToDefault()
      }
    },
  }),
)

export default container
