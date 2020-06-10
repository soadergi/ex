import * as R from 'ramda'
import {
  compose,
  lifecycle,
  withPropsOnChange,
  withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'
import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import { goTo, NAMES } from 'weplay-core/routes'
import { readSpecialTags } from 'weplay-core/reduxs/specialTags/actions'
import {
  isSpecialTagsLoadingSelector,
  specialTagsCountSelector,
} from 'weplay-core/reduxs/specialTags/reducer'
import { getSections } from 'weplay-core/reduxs/sections/actions'
import {
  latestIdsSelector,
  popularIdsSelector,
  topIdsSelector,
} from 'weplay-core/reduxs/sections/reducer'

const container = compose(
  withRouter,
  withLocale, // props: { locale, t }
  connect(createStructuredSelector({
    popularIds: popularIdsSelector,
    topIds: topIdsSelector,
    latestIds: latestIdsSelector,
    isSpecialTagsLoading: isSpecialTagsLoadingSelector,
    specialTagsCount: specialTagsCountSelector,
  }), {
    getSections: getSections.request,
    readSpecialTags: readSpecialTags.request,
  }),

  withPropsOnChange([
    'match',
    'specialTagsCount',
  ], ({
    match,
    specialTagsCount,
  }) => ({
    activeTab: R.pathOr('top', ['params', 'tab'], match),
    isSpecialTagsAvailable: Boolean(specialTagsCount),
    translationSuffix: specialTagsCount
      ? 'withSpecialProjects'
      : 'withNews',
  })),

  withHandlers({
    goToRoot: ({ history }) => () => goTo({
      name: NAMES.MEDIA,
      history,
    }),
  }),

  lifecycle({
    componentDidMount() {
      this.props.readSpecialTags({
        language: this.props.locale,
        is_active: 1,
      })
    },

    componentDidUpdate(prevProps) {
      const {
        history,
        match,
        locale,
        isSpecialTagsLoading,
        specialTagsCount,
      } = this.props

      if (!isSpecialTagsLoading && !specialTagsCount) {
        this.props.getSections({ language: this.props.locale })
      }

      if (prevProps.locale !== locale) {
        goTo({
          name: NAMES.SPECIAL_TAG,
          history,
          params: {
            specialTagId: match.params.itemId,
          },
        })
      }
    },
  }),
)

export default container
