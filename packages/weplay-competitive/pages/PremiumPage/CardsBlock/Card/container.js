import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import { pluralTextName } from 'weplay-core/helpers/isSingular'
import { wpPointsAmountSelector } from 'weplay-core/reduxs/wallets/reducer'
import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

import { floatFormatValue } from 'weplay-competitive/utils/floatFormatValue'

const ONE_MONTH = 1

const container = compose(
  withLocale,
  connect(createStructuredSelector({
    // selectors
    wpPointsAmount: wpPointsAmountSelector,
    isLoggedIn: isLoggedInSelector,
  }), {
    // actionCreators
  }),
  withPropsOnChange([
    'card',
    'isWpCurrency',
  ], ({
    card,
    isWpCurrency,
  }) => ({
    pricePerMonth: floatFormatValue(isWpCurrency
      ? card.wpPrice / card.period
      : card.usdPrice / card.period),
    totalPrice: (isWpCurrency ? card.wpPrice : card.usdPrice),
    currency: isWpCurrency ? 'WP' : '$',
  })),
  withPropsOnChange([
    'isWpCurrency',
    'wpPointsAmount',
    'totalPrice',
    'currency',
    'card',
    't',
  ], ({
    isWpCurrency,
    wpPointsAmount,
    totalPrice,
    currency,
    card,
    t,
  }) => {
    const autoRenew = isWpCurrency ? t('competitive.premium.card.autoRenew') : ''
    return ({
      totalPrizeNote: card.period === ONE_MONTH
        ? `${totalPrice}${currency} ${t('competitive.premium.card.perMonth')} ${autoRenew}`
        : `${totalPrice}${currency} 
        ${t('competitive.premium.card.perVariableMonths',
        {
          num: card.period,
          month: t(`competitive.premium.card.months.${pluralTextName(card.period)}`),
        })}
      ${autoRenew}`,
      notEnoughWP: isWpCurrency && totalPrice > wpPointsAmount
        ? t('competitive.premium.card.notEnoughWP')
        : '',
    })
  }),
)

export default container
