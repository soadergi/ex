import {
  compose,
  withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { currentLanguageSelector, i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

const container = compose(
  connect(createStructuredSelector({
    currentLanguage: currentLanguageSelector,
    i18nTexts: i18nTextsSelector,
  }), {
    // actionCreators
  }),

  withHandlers({
    /* eslint-disable no-shadow */
    fetchMoreArticles: ({
      fetchUserArticles,
      hasMoreArticles,
    }) => () => {
      if (hasMoreArticles) {
        fetchUserArticles()
      }
    },
  }),
)

export default container
