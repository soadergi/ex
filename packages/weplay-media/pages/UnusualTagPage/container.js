import * as R from 'ramda'
import {
  compose,
  withPropsOnChange,
  lifecycle,
  withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'
import { goTo, NAMES } from 'weplay-core/routes'

import withPreloader from 'weplay-components/withPreloader'

import withContentStatus from 'weplay-media/HOCs/withContentStatus'
import { readUnusualTag, readUnusualTags } from 'weplay-media/reduxs/unusualTag/actions'
import { createUnusalTagByIdSelector } from 'weplay-media/reduxs/unusualTag/reducer'

const container = compose(
  connect(createStructuredSelector({
    unusualTag: createUnusalTagByIdSelector(R.path([
      'match', 'params', 'unusualTagId',
    ])),
  }), {
    readUnusualTags: readUnusualTags.request,
    readUnusualTag: readUnusualTag.request,
  }),
  withContentStatus,

  withPageViewAnalytics(({
    unusualTag,
  }) => ({
    tagName: R.prop('name', unusualTag),
  })),

  withPropsOnChange([
    'unusualTag',
    'match',
  ], ({
    unusualTag,
    match: { params: { unusualTagId } },
  }) => ({
    seoInfo: R.propOr({}, 'seo', unusualTag),
    seoText: R.pathOr('', ['seo', 'text'], unusualTag),
    unusualTagId,
  })),

  /* eslint-disable no-shadow */
  withHandlers({
    goToRoot: ({ history }) => () => goTo({
      name: NAMES.MEDIA,
      history,
    }),
  }),

  /* eslint-enable no-shadow */
  lifecycle({
    componentDidMount() {
      this.props.readUnusualTag({
        unusualTagId: this.props.unusualTagId,
      })
      this.props.handleContentStatus(this.props.unusualTag)
    },

    componentDidUpdate(prevProps) {
      if (R.prop('tagId', prevProps.unusualTag) !== R.prop('tagId', this.props.unusualTag)) {
        this.props.handleContentStatus(this.props.unusualTag)
      }
    },
  }),
  withPreloader({
    mapPropsToIsLoading: ({ unusualTag }) => !unusualTag,
  }),
)

export default container
