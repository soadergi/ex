import { connect } from 'react-redux'
import {
  compose,
  withPropsOnChange,
  lifecycle,
} from 'recompose'
import { createStructuredSelector } from 'reselect'
import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import { promoCodesCountSelector } from 'weplay-core/reduxs/promoCodes/reducer'
import { getPromoCodesCount } from 'weplay-core/reduxs/promoCodes/actions'
import { isTabletWidthLegacySelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

const container = compose(
  connect(createStructuredSelector({
    i18nTexts: i18nTextsSelector,
    isTabletWidth: isTabletWidthLegacySelector,
    promocodesCount: promoCodesCountSelector,
  }), {
    getPromoCodesCount: getPromoCodesCount.request,
  }),

  withPropsOnChange([
    'pageName',
    'i18nTexts',
  ], ({
    pageName,
    i18nTexts,
  }) => ({
    stepsList: [
      i18nTexts[pageName].codes.itemOne,
      i18nTexts[pageName].codes.itemTwo,
      i18nTexts[pageName].codes.itemThree,
    ],
  })),

  lifecycle({
    componentDidMount() {
      this.props.getPromoCodesCount({
        activatedDateFrom: this.props.activatedDateFrom,
        activatedDateTo: this.props.activatedDateTo,
      })
    },
  }),
)

export default container
