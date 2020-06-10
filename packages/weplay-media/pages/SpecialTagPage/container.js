import * as R from 'ramda'
import {
  compose,
  lifecycle,
  withPropsOnChange,
} from 'recompose'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'
import {
  currentLanguagePrefixSelector,
  i18nTextsSelector,
} from 'weplay-core/reduxs/language/reducer'
import { goTo, NAMES } from 'weplay-core/routes'
import { readSpecialTag } from 'weplay-core/reduxs/specialTags/actions'
import { transformUrl } from 'weplay-core/helpers/transformUrl'
import {
  createSpecialTagByIdSelector,
  isSpecialTagLoadingSelector,
} from 'weplay-core/reduxs/specialTags/reducer'

import withPreloader from 'weplay-components/withPreloader'

import withContentStatus from 'weplay-media/HOCs/withContentStatus'

const container = compose(
  withRouter,
  connect(createStructuredSelector({
    i18nTexts: i18nTextsSelector,
    specialTag: createSpecialTagByIdSelector(R.path([
      'match', 'params', 'specialTagId',
    ])),
    loading: isSpecialTagLoadingSelector,
    currentLanguagePrefix: currentLanguagePrefixSelector,
  }), {
    readSpecialTag: readSpecialTag.request,
  }),
  withContentStatus,

  withPageViewAnalytics(({
    specialTag,
  }) => ({
    projectName: R.prop('name', specialTag),
  })),

  withPropsOnChange([
    'specialTag',
    'match',
  ], ({
    specialTag,
    match: { params: { specialTagId } },
  }) => ({
    seoInfo: R.propOr({}, 'seo', specialTag),
    specialTagId,
  })),
  lifecycle({
    componentDidMount() {
      this.props.readSpecialTag({
        specialTagId: this.props.specialTagId,
      })
      this.props.handleContentStatus(this.props.specialTag)
    },

    componentDidUpdate(prevProps) {
      const {
        specialTag,
        loading,
        history,
        match,
        currentLanguagePrefix,
        handleContentStatus,
      } = this.props

      if (!specialTag && !loading) {
        goTo({
          name: NAMES.NO_LANG,
          history,
          params: {
            itemId: match.params.specialTagId,
            pathNamePrefix: 'special-tags',
            tab: 'top',
          },
        })
      }

      if (specialTag && (!match.params[0] || match.params[0] === '*')) {
        history.replace(`${currentLanguagePrefix}/special-tags/${transformUrl(specialTag)}`)
      }

      if (R.prop('specialTagTranslateId', prevProps.specialTag) !== R.prop('specialTagTranslateId', specialTag)) {
        handleContentStatus(specialTag)
      }
    },
  }),
  withPreloader({
    mapPropsToIsLoading: ({ specialTag }) => !specialTag,
  }),
)

export default container
