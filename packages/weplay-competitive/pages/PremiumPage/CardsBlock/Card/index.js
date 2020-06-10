import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { pluralTextName } from 'weplay-core/helpers/isSingular'
import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'

import Label from 'weplay-components/Label'
import Button, { BUTTON_COLOR } from 'weplay-components/Button'

import premiumCardPropType from 'weplay-competitive/customPropTypes/premiumCardPropType'

import container from './container'
import styles from './styles.scss'

const Card = ({
  // required props
  card,
  onClick,
  isWpCurrency,
  // container props
  t,
  totalPrizeNote,
  notEnoughWP,
  pricePerMonth,
  isLoggedIn,

  // optional props
}) => (
  <div className={styles.block}>
    <div className={styles.timeBlock}>
      <p className={styles.time}>
        {`${card.period} ${t(`competitive.premium.card.months.${pluralTextName(card.period)}`)}`}
      </p>
      {!R.isEmpty(card.discount) && card.discount > 0 && (
        <span className={styles.economy}>
          {`${t('competitive.premium.card.economy')} ${card.discount}%`}
        </span>
      )}
    </div>
    <p className={styles.price}>
      <span className={classNames(
        styles.unit,
        'u-text-uppercase',
        {
          [styles.wp]: isWpCurrency,
        },
      )}
      >
        {isWpCurrency ? 'WP' : '$'}
      </span>
      {pricePerMonth}
    </p>
    <span className={styles.description}>
      {t('competitive.premium.card.description')}
    </span>
    {notEnoughWP && isLoggedIn ? (
      <Label
        className={styles.label}
        color="warning"
      >
        {notEnoughWP}
      </Label>
    )
      : (
        <Button
          color={BUTTON_COLOR.CTA}
          onClick={onClick}
          className={styles.button}
          {...getAnalyticsAttributes({
            'ecommerce-currency-code': 'USD',
            'ecommerce-name': `${card.period} month`,
            'ecommerce-id': card.subscriptionId,
            'ecommerce-price': card.usdPrice,
            'ecommerce-position': card.position,
            'ecommerce-action': 'Product Clicks',
          })}
        >
          {t('competitive.premium.card.buyPremiumBtn')}
        </Button>
      )}
    <span className={styles.note}>
      {totalPrizeNote}
    </span>
  </div>
)

Card.propTypes = {
  // required props
  isWpCurrency: PropTypes.bool.isRequired,
  card: premiumCardPropType.isRequired,
  onClick: PropTypes.func.isRequired,
  // container props
  t: PropTypes.func.isRequired,
  totalPrizeNote: PropTypes.string.isRequired,
  notEnoughWP: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  pricePerMonth: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  // optional props
}

Card.defaultProps = {
  // optional props
}

export default container(Card)
