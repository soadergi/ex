import * as R from 'ramda'
import {
  compose, lifecycle, withHandlers, withProps,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector, currentLanguageSelector } from 'weplay-core/reduxs/language/reducer'
import {
  createSpecialTagsPageSelector,
  specialTagsHasErrorSelector,
  specialTagsHasMoreSelector,
  specialTagsByLangSelector,
  isSpecialTagsLoadingSelector,
} from 'weplay-core/reduxs/specialTags/reducer'
import { readSpecialTags } from 'weplay-core/reduxs/specialTags/actions'

// TODO: rewrite this piece of shit alongside with template
const container = compose(
  withProps({
    pageSize: 20,
  }),
  connect(createStructuredSelector({
    specialTags: specialTagsByLangSelector,
    specialTagsHasMore: specialTagsHasMoreSelector,
    currentLanguage: currentLanguageSelector,
    i18nTexts: i18nTextsSelector,
    specialTagsPage: createSpecialTagsPageSelector(R.prop('pageSize')),
    specialTagsHasError: specialTagsHasErrorSelector,
    isSpecialTagsLoading: isSpecialTagsLoadingSelector,
  }), {
    readSpecialTags: readSpecialTags.request,
  }),
  withHandlers({
    fetchPage: ({
      currentLanguage,
      pageSize,
      readSpecialTags, // eslint-disable-line no-shadow
    }) => pageNumber => readSpecialTags({
      language: currentLanguage,
      limit: pageSize,
      offset: (pageNumber - 1) * pageSize,
      is_active: 1,
    }),
  }),
  withHandlers({
    loadNextPage: ({
      fetchPage,
      specialTagsPage,
    }) => () => fetchPage(specialTagsPage + 1),
  }),
  lifecycle({
    componentDidMount() {
      this.props.fetchPage(1)
    },

    componentDidUpdate(prevProps) {
      if (prevProps.currentLanguage !== this.props.currentLanguage) {
        this.props.fetchPage(1)
      }
    },
  }),
)

container.propTypes = {
}
container.defaultProps = {
}
export default container
