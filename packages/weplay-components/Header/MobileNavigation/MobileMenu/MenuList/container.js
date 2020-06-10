import {
  compose,
  withStateHandlers,
  withHandlers,
  lifecycle,
  pure, withPropsOnChange,
} from 'recompose'

import withRouteInfo from 'weplay-core/routes/withRouteInfo'

const container = compose(
  withRouteInfo,
  pure,
  withStateHandlers({
    isCollapsed: true,
  }, {
    toggleMenu: ({ isCollapsed }) => () => ({
      isCollapsed: !isCollapsed,
    }),
    closeMenu: () => () => ({
      isCollapsed: true,
    }),
    openMenu: () => () => ({
      isCollapsed: false,
    }),
  }),
  withPropsOnChange([
    'getCustomSubMenu',
    'closeMobileMenu',
    'project',
  ], ({
    getCustomSubMenu,
    closeMobileMenu,
    project,
  }) => ({
    customSubmenu: getCustomSubMenu({
      closeMobileMenu,
      project,
    }),
  })),

  withHandlers({
    handleClick: ({
      toggleMenu,
      customSubmenu,
    }) => (event) => {
      if (customSubmenu) {
        event.preventDefault()
      }
      toggleMenu()
    },
    handleLocationUpdate: ({
      routeInfo,
      project,
      openMenu,
      closeMenu,
    }) => () => {
      if (routeInfo.project === project) {
        openMenu()
      } else {
        closeMenu()
      }
    },
  }),

  lifecycle({
    componentDidMount() {
      this.props.handleLocationUpdate()
    },
    componentDidUpdate(prevProps) {
      if (prevProps.routeInfo.project !== this.props.routeInfo.project) {
        this.props.handleLocationUpdate()
      }
    },
  }),
)

export default container
