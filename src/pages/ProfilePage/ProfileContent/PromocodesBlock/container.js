import * as R from 'ramda'
import {
  compose,
  withProps,
  withPropsOnChange,
  withStateHandlers,
} from 'recompose'
import {
  getUserPromoCodes,
} from 'weplay-core/reduxs/_legacy/auth/actions'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  i18nTextsSelector,
} from 'weplay-core/reduxs/language/reducer'

import { INITIALY_VISIBLE_PROMOCODES_COUNT } from '../constants'

import promoCodeBackground from './img/bg_cabinet.jpg'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
  }), {
    // actionCreators
    getUserPromoCodes,
  }),

  withProps({
    linkToCodesPage: '/codes',
  }),

  withStateHandlers({
    showingAllCodes: false,
  }, {
    handlerShowAllPromoCodes: ({
      showingAllCodes, // TODO @Andrey please check this part
    }, {
      currentUser,
      getUserPromoCodes, // eslint-disable-line no-shadow
    }) => () => {
      if (!showingAllCodes
        && currentUser
        && (currentUser.userPromoCodes.count !== currentUser.userPromoCodes.promoCodesList.length)
      ) {
        getUserPromoCodes({
          params: {
            user_id: currentUser.id,
            limit: currentUser.userPromoCodes.count,
          },
        })
      }
      return { showingAllCodes: !showingAllCodes }
    },
  }),

  withPropsOnChange(
    [
      'currentUser',
      'showingAllCodes',
      'i18nTexts',
    ], ({
      currentUser,
      showingAllCodes,
      i18nTexts,
    }) => ({
      hasActivatedPromocodes:
        R.path(['userPromoCodes', 'count'], currentUser) > 0,
      isPromocodesCountHidden:
        R.path(['userPromoCodes', 'count'], currentUser) > 4,
      promocodesList:
        R.pathOr([], ['userPromoCodes', 'promoCodesList'], currentUser)
          .filter((promoCode, index) => index < INITIALY_VISIBLE_PROMOCODES_COUNT || showingAllCodes),
      showAllCodesButtonText: showingAllCodes
        ? i18nTexts.cabinet.promoTableHideBtn : i18nTexts.cabinet.promoTableBtn,
    }),
  ),
  withProps(() => ({
    background: {
      backgroundImage: `url('${promoCodeBackground}')`,
    },
  })),
)

export default container
