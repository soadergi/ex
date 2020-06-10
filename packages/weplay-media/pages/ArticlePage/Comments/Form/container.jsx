import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import withLocale from 'weplay-singleton/LocaleProvider/withLocale'
import { i18nTextsSelector, currentLanguageSelector } from 'weplay-core/reduxs/language/reducer'
import { currentUserSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { addComment, getComments } from 'weplay-media/reduxs/comments/actions'

const container = compose(
  withLocale, // props: { locale, t }
  connect(createStructuredSelector({
    i18nTexts: i18nTextsSelector,
    currentUser: currentUserSelector,
    currentLanguage: currentLanguageSelector,
  }), {
    addComment: addComment.request,
    getComments: getComments.request,
  }),
  // TODO use hooks and refactor comment form
  withHandlers({
    handleCommentFormSubmit: props => ({ body }) => {
      props.addComment(
        {
          body,
          newspaperId: props.newspaperId,
        },
      ).then(() => props.handleGetComments())
    },
  }),
)

export default container
