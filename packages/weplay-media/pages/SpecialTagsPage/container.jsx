import {
  compose,
  withHandlers,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'
import { goTo, NAMES } from 'weplay-core/routes'
import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

const container = compose(
  connect(createStructuredSelector({
    i18nTexts: i18nTextsSelector,
  }), {
  }),

  withPageViewAnalytics(),

  withHandlers({
    goToRoot: ({ history }) => () => goTo({
      name: NAMES.MEDIA,
      history,
    }),
  }),
  withPropsOnChange([
    'i18nTexts',
  ], (({
    i18nTexts,
  }) => ({
    entityName: i18nTexts.text.specialProjects,
  }))),
)

export default container
