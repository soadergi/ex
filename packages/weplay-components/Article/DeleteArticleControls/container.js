import {
  compose,
  withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

const container = compose(
  connect(createStructuredSelector({
    i18nTexts: i18nTextsSelector,
  }), {
    // actionCreators
  }),

  withHandlers(({
    onDeleteArticle,
    controlledArticleId,
  }) => ({
    handleDeleteArticle: () => () => onDeleteArticle(controlledArticleId),
  })),
)

export default container
