import {
  compose,
  withPropsOnChange,
  withHandlers,
  lifecycle,
  withState,
} from 'recompose'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'
import { headerHeightSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

function getElementOffsetTop(el) {
  const rect = el.getBoundingClientRect()
  return rect.top + window.pageYOffset
}

const initialPadding = 50
function isElementInViewport(el, offset = 0, padding = initialPadding) {
  const scrollTop = document.documentElement.scrollTop
      || document.body.parentNode.scrollTop
      || document.body.scrollTop
  const globalHeight = window.innerHeight || document.documentElement.clientHeight

  const rect = el.getBoundingClientRect()
  const scrollBottom = scrollTop + globalHeight
  const elTop = rect.top + scrollTop - offset - padding
  const elBottom = elTop + el.offsetHeight
  return (elTop < scrollBottom) && (elBottom > scrollTop)
}

const container = compose(
  withRouter,
  connect(createStructuredSelector({
    // selectors
    headerHeight: headerHeightSelector,
    globalScope: globalScopeSelector,
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'scrollSpySections',
  ], ({
    scrollSpySections,
  }) => ({
    scrollSpyHrefs: scrollSpySections.map(item => (item.rendered ? item.href : null)),
  })),

  withHandlers(({ globalScope, headerHeight }) => ({
    handleScrollToSection: () => (el) => {
      const offsetTop = getElementOffsetTop(el)
      globalScope.scrollTo({
        top: offsetTop - headerHeight,
        behavior: 'smooth',
      })
    },
  })),

  withState('activeSection', 'updateActiveSection', null),

  withHandlers({
    handleScroll: ({ scrollSpyHrefs, updateActiveSection, headerHeight }) => () => {
      const sectionInView = R.find(
        // eslint-disable-next-line array-callback-return,consistent-return
        (id) => {
          if (id) {
            const section = document.getElementById(id)
            return isElementInViewport(section, headerHeight)
          }
        },
      )(scrollSpyHrefs)
      updateActiveSection(sectionInView || null)
    },
  }),

  lifecycle({
    componentDidMount() {
      window.addEventListener('scroll', this.props.handleScroll)
      this.props.handleScroll()
    },
    componentWillUnmount() {
      window.removeEventListener('scroll', this.props.handleScroll)
    },
  }),

)

export default container
