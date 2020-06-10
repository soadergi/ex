import {
  compose, lifecycle, withHandlers, withStateHandlers,
} from 'recompose'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import queryString from 'query-string'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import {
  i18nTextsSelector,
} from 'weplay-core/reduxs/language/reducer'
import {
  globalScopeSelector,
} from 'weplay-core/reduxs/common/selectors'
import { currentUserSelector, isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

import { createCommentByIdSelector } from 'weplay-media/reduxs/comments/reducer'

const AUTHOR_HEIGHT = 50
const SUBHEADER_HEIGHT = 40
const SMALL_MARGIN = 10
const timeout = 500
const container = compose(
  withRouter,
  connect(createStructuredSelector({
    i18nTexts: i18nTextsSelector,
    currentUser: currentUserSelector,
    isLoggedIn: isLoggedInSelector,
    globalScope: globalScopeSelector,
    item: createCommentByIdSelector(props => props.id),
  }), {
  }),
  withStateHandlers({
    commentFormVisible: false,
    hideCollapse: false,
  }, {
    onOpenCommentHandler: ({ commentFormVisible }) => () => (!commentFormVisible
      ? { commentFormVisible: true }
      : null),
    onCloseCommentHandler: ({ commentFormVisible }) => () => (commentFormVisible
      ? { commentFormVisible: false }
      : null),
    handleOpenCollapse: () => () => ({ hideCollapse: true }),
  }),

  withHandlers(() => {
    let commentEl
    return {
      saveCommentRef: () => (ref) => { commentEl = ref },
      scrollToComment: ({ globalScope }) => () => {
        if (commentEl) {
          setTimeout(() => {
            if (commentEl) {
              // TODO: @illia think about better fix here
              globalScope.scrollTo(0, commentEl.offsetTop - AUTHOR_HEIGHT - SUBHEADER_HEIGHT - SMALL_MARGIN)
            }
          }, timeout)
        }
      },
    }
  }),

  lifecycle({
    componentDidMount() {
      const {
        scrollToComment,
        location,
        item,
      } = this.props

      const anchorCommentId = queryString.parse(location.search).anchorCommentId  // eslint-disable-line
      if (item.id === anchorCommentId) {
        scrollToComment()
      }
    },

    componentDidUpdate(prevProps) {
      const {
        location,
        scrollToComment,
        item,
      } = this.props

      const anchorCommentId = queryString.parse(location.search).anchorCommentId  // eslint-disable-line
      const prevAnchorCommentId = queryString.parse(prevProps.location.search).anchorCommentId
      if (
        item.id === anchorCommentId
        && prevAnchorCommentId !== anchorCommentId
      ) {
        scrollToComment()
      }
    },
  }),
)

export default container
