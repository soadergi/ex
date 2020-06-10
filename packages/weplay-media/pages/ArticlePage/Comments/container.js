import {
  compose,
  branch,
  renderNothing,
  withStateHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

const container = compose(
  branch(
    ({ isVisible }) => !isVisible,
    renderNothing,
  ),

  withRouter,
  connect(createStructuredSelector({
    // selectors
    isLoggedIn: isLoggedInSelector,
    i18nTexts: i18nTextsSelector,
  }), {
    // actionCreators
  }),
  withStateHandlers({
    commentToDelete: null,
  }, {
    hideDeleteCommentModal: () => () => ({
      commentToDelete: null,
    }),
    showDeleteCommentModal: () => comment => ({
      commentToDelete: comment,
    }),
  }),
)

export default container
