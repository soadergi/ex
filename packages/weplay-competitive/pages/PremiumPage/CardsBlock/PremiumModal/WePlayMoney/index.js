import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { usdAmountSelector } from 'weplay-core/reduxs/wallets/reducer'
import useAction from 'weplay-core/helpers/useAction'
import withAnalytics from 'weplay-core/HOCs/withAnalytics'
import { formatPrizeWithDigit } from 'weplay-core/helpers/formatPrizeWithDigits'
import { applyPremium } from 'weplay-core/reduxs/premiums/actions'

import Link from 'weplay-components/Link'
import Tip from 'weplay-components/Tip'
import Button, { BUTTON_COLOR } from 'weplay-components/Button'

import { AT__PREMIUM_PAY, AT__PREMIUM_SUCCESS } from 'weplay-competitive/analytics/amplitude'
import { PAYMENT_TYPES } from 'weplay-competitive/constants/paymentTypes'
import premiumCardPropType from 'weplay-competitive/customPropTypes/premiumCardPropType'

import styles from './styles.scss'

const WePlayMoney = ({
  activePremiumCard,
  updateUserInfo,
  // props from HOC
  logAmplitude,
}) => {
  const termsLink = '/legal/premiumpolicy'
  const t = useTranslation()
  const usdAmount = useSelector(usdAmountSelector)
  const { applyPremiumRequest } = useAction({ applyPremiumRequest: applyPremium.request })
  const totalPrice = activePremiumCard?.usdPrice ?? 0
  const notEnoughUsdBalance = totalPrice > usdAmount

  const handlePaymentByUsdBalance = useCallback(() => {
    logAmplitude(AT__PREMIUM_PAY)
    applyPremiumRequest({
      params: {
        subscription_id: activePremiumCard.subscriptionId,
        type: PAYMENT_TYPES.USD_BALANCE,
      },
    })
      .then(() => {
        logAmplitude(AT__PREMIUM_SUCCESS)
        updateUserInfo()
      })
  }, [])

  return (
    <>
      <div className={styles.balance}>
        <div className={styles.table}>
          <span>{t('competitive.premium.premiumModal.wpBalanceTitle')}</span>
          <span className={styles.textBold}>
            {`${formatPrizeWithDigit(usdAmount)}$`}
          </span>
        </div>
        <Tip isWarning>
          {t('competitive.premium.premiumModal.wpBalanceWarning')}
        </Tip>
      </div>
      <Button
        color={BUTTON_COLOR.GOLD}
        disabled={notEnoughUsdBalance}
        className={styles.button}
        onClick={handlePaymentByUsdBalance}
      >
        {t('competitive.premium.premiumModal.pay')}
      </Button>
      <Tip>
        {
          t('competitive.premium.modal.tip.termsWePlay', {
            terms_weplay: (
              <Link
                key="termsWeplayMoney"
                to={termsLink}
              >
                {t('competitive.premium.modal.tip.termsOfService')}
              </Link>
            ),
          })
        }
      </Tip>
      <div className={styles.count}>
        <span className={styles.countText}>{t('competitive.premium.premiumModal.countTitle')}</span>
        <span className={styles.countText}>
          {`${formatPrizeWithDigit(totalPrice)}$`}
        </span>
      </div>
      <div className={styles.errors}>
        {notEnoughUsdBalance && (
          <Tip isError>
            {t('competitive.premium.premiumModal.notEnoughFunds')}
          </Tip>
        )}
      </div>
    </>
  )
}

WePlayMoney.propTypes = {
  activePremiumCard: premiumCardPropType.isRequired,
  updateUserInfo: PropTypes.func.isRequired,
  // props from HOC
  logAmplitude: PropTypes.func.isRequired,
}

export default withAnalytics(WePlayMoney)
