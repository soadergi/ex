import * as R from 'ramda'
import {
  compose,
  lifecycle,
  withHandlers,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'
import {
  currentLanguagePrefixSelector, i18nTextsSelector,
} from 'weplay-core/reduxs/language/reducer'
import { goTo, NAMES } from 'weplay-core/routes'
import { transformUrl } from 'weplay-core/helpers/transformUrl'

import withPreloader from 'weplay-components/withPreloader'

import withContentStatus from 'weplay-media/HOCs/withContentStatus'
import { readTag } from 'weplay-media/reduxs/tags/actions'
import {
  isTagsLoadingSelector,
  createTagByIdSelector,
} from 'weplay-media/reduxs/tags/reducer'

const container = compose(
  connect(createStructuredSelector({
    tag: createTagByIdSelector(R.path([
      'match', 'params', 'tagId',
    ])),
    isLoading: isTagsLoadingSelector,
    i18nTexts: i18nTextsSelector,
    currentLanguagePrefix: currentLanguagePrefixSelector,
  }), {
    readTag: readTag.request,
  }),
  withContentStatus,

  withPageViewAnalytics(({
    tag,
  }) => ({
    tagName: tag.name,
  })),

  /* eslint-disable no-shadow */
  withHandlers({
    goToRoot: ({ history }) => () => goTo({
      name: NAMES.MEDIA,
      history,
    }),
  }),

  withPropsOnChange([
    'tag',
    'match',
  ], ({
    tag,
    match: { params: { tagId } },
  }) => ({
    tagName: R.propOr('loading tag...', 'name', tag),
    seoInfo: R.propOr({}, 'seo', tag),
    seoText: R.pathOr('', ['seo', 'text'], tag),
    tagId,
  })),

  lifecycle({
    componentDidMount() {
      this.props.readTag({
        tagId: this.props.match.params.tagId,
      })
      this.props.handleContentStatus(this.props.tag)
    },

    componentDidUpdate(prevProps) {
      const {
        tag,
        history,
        match,
        currentLanguagePrefix,
        handleContentStatus,
      } = this.props

      if (prevProps.tagId !== this.props.tagId) {
        this.props.readTag({
          tagId: this.props.tagId,
        })
      }

      if (R.not(R.isEmpty(tag)) && (!match.params[0] || match.params[0] === '*')) {
        history.replace(`${currentLanguagePrefix}/tags/${transformUrl(tag)}`)
      }

      if (prevProps.tag.tagId !== tag.tagId) {
        handleContentStatus(tag)
      }
    },
  }),
  withPreloader({
    mapPropsToIsLoading: ({ isLoading }) => isLoading,
  }),
)

export default container
