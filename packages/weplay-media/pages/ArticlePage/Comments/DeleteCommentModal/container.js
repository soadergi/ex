import {
  compose,
  withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

import { deleteComment } from 'weplay-media/reduxs/comments/actions'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
  }), {
    // actionCreators
    deleteComment: deleteComment.request,
  }),
  withHandlers({
    handleDeleteComment: props => (comment) => {
      props.deleteComment({ commentId: comment.id, status: 'deleted', newspaperId: props.newspaperId })
    },
  }),
)

export default container
