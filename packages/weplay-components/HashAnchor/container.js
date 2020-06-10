import {
  compose,
  lifecycle,
  withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'
import { headerHeightSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

const timeout = 500
const container = compose(
  withRouter,
  connect(createStructuredSelector({
    // selectors
    globalScope: globalScopeSelector,
    headerHeight: headerHeightSelector,
  }), {
    // actionCreators
  }),

  withHandlers(() => {
    let anchorElement
    return {
      setAnchorElementRef: () => (elem) => {
        anchorElement = elem
      },
      scrollToAnchor: ({
        location,
        globalScope,
        anchorId,
        headerHeight,
      }) => () => {
        const { hash } = location
        if (hash !== '') {
          const hashId = hash.substring(1)
          if (hashId === anchorId) {
            // TODO: @illia think about better fix here
            setTimeout(() => {
              if (anchorElement) {
                const rect = anchorElement.getBoundingClientRect()
                const offsetTop = rect.top + globalScope.document.documentElement.scrollTop
                globalScope.scrollTo({
                  top: offsetTop - headerHeight,
                  behavior: 'smooth',
                })
              }
            }, timeout)
          }
        }
      },
    }
  }),

  lifecycle({
    componentDidMount() {
      this.props.scrollToAnchor()
    },
  }),

)

export default container
