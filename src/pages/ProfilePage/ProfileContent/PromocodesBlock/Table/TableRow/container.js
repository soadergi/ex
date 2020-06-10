import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import {
  i18nTextsSelector,
} from 'weplay-core/reduxs/language/reducer'
import { createStructuredSelector } from 'reselect'


const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
  }), {
    // actionCreators
  }),

  withPropsOnChange(
    [
      'promocode',
      'i18nTexts',
    ], ({
      promocode,
      i18nTexts,
    }) => ({
      codeStatus: promocode.status === 'success'
        ? i18nTexts.cabinet.promoAccepted
        : i18nTexts.cabinet.promoDeclined,
    }),
  ),
)

export default container
