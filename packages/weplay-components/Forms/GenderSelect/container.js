import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

import { GENDERS } from './consts'

const container = compose(
  connect(createStructuredSelector({
    i18nTexts: i18nTextsSelector,
    // selectors
  }), {
    // actionCreators
  }),
  withPropsOnChange([
    'i18nTexts',
    'gender',
  ], ({
    i18nTexts,
    gender,
  }) => ({
    genderOptions: GENDERS.map(value => ({ value, label: i18nTexts.registration.genderOptions[value] })),
    placeholder: gender
      ? i18nTexts.registration.genderOptions[gender]
      : i18nTexts.registration.genderPlaceholder,
  })),
)

export default container
