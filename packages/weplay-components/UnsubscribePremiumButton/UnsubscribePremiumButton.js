import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import {
  expirePremiumAccountDateSelector,
  isAutoExtendPremiumEnabledSelector,
  isPremiumSelector,
} from 'weplay-core/reduxs/_legacy/auth/reducer'
import useAction from 'weplay-core/helpers/useAction'
import { cancelPremium } from 'weplay-core/reduxs/premiums/actions'
import withMoment from 'weplay-core/HOCs/withMoment'
import { getAmplitudeAttributes } from 'weplay-core/helpers/getAmplitudeAttributes'
import withAnalytics from 'weplay-core/HOCs/withAnalytics'
import { useFormatDatetime } from 'weplay-core/hooks/useFormatDatetime'

import Button, { BUTTON_COLOR, BUTTON_PRIORITY } from 'weplay-components/Button'
import ConfirmModal from 'weplay-components/Modals/ConfirmModal'

import styles from './styles.scss'

export const AT__PROFILE_PREMIUM_CANCEL = 'Tournaments. Account. Premium. Cancel subscription'
export const AT__PROFILE_PREMIUM_CANCEL_CONFIRM = 'Tournaments. Account. Premium. Cancel subscription confirm'

const UnsubscribePremiumButton = ({
  logAmplitude,
}) => {
  const t = useTranslation()
  const formatDatetime = useFormatDatetime()
  const isPremium = useSelector(isPremiumSelector)
  const isAutoExtendPremiumEnabled = useSelector(isAutoExtendPremiumEnabledSelector)
  const expirePremiumAccountDate = useSelector(expirePremiumAccountDateSelector)

  const [isConfirmModalShown, setIsConfirmModalShown] = useState(false)
  const { cancelPremiumRequest } = useAction({ cancelPremiumRequest: cancelPremium.request })
  const openConfirmModal = useCallback(
    () => setIsConfirmModalShown(true),
    [setIsConfirmModalShown],
  )
  const closeConfirmModal = useCallback(
    () => setIsConfirmModalShown(false),
    [setIsConfirmModalShown],
  )

  const handleCancelPremium = useCallback(() => {
    cancelPremiumRequest()
      .then(() => {
        closeConfirmModal()
        logAmplitude(AT__PROFILE_PREMIUM_CANCEL_CONFIRM)
      })
      // TODO: @Tetiana add log to Sentry
      .catch(err => console.log('Error cancelPremiumRequest', err))
  }, [cancelPremiumRequest, closeConfirmModal])

  return (
    <>
      {isPremium && isAutoExtendPremiumEnabled && (
      <Button
        priority={BUTTON_PRIORITY.SECONDARY}
        color={BUTTON_COLOR.GRAY}
        className={classNames(
          'u-ml-sm-3',
          'u-mb-2',
        )}
        onClick={openConfirmModal}
        {...getAmplitudeAttributes({
          'amplitude-action': AT__PROFILE_PREMIUM_CANCEL,
        })}
      >
        {t('cabinet.walletWidget.unsubscribePremium')}
      </Button>
      )}
      {isPremium && !isAutoExtendPremiumEnabled && (
        <div className={styles.wrapper}>
          <span className={styles.tip}>
            {t('cabinet.walletWidget.premiumWithoutAutoExtend', {
              date: formatDatetime(expirePremiumAccountDate, { formatKey: 'short' }),
            })}
          </span>
        </div>
      )}
      <ConfirmModal
        isShown={isConfirmModalShown}
        onCloseModal={closeConfirmModal}
        onConfirm={handleCancelPremium}
        title={t('competitive.premium.modals.confirmCancelPremium.title')}
        subTitle={t('competitive.premium.modals.confirmCancelPremium.subTitle', {
          date: formatDatetime(expirePremiumAccountDate, { formatKey: 'short' }),
        })}
        confirmBtnText={t('competitive.premium.modals.confirmCancelPremium.confirmBtnText')}
        closeBtnText={t('competitive.premium.modals.confirmCancelPremium.closeBtnText')}
      />
    </>
  )
}

UnsubscribePremiumButton.propTypes = {
  // props from HOC
  logAmplitude: PropTypes.func.isRequired,
  moment: PropTypes.func.isRequired,
}

export default withAnalytics(withMoment(UnsubscribePremiumButton))
