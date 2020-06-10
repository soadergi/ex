import React from 'react'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { expirePremiumAccountDateSelector, isDiscordConnectedSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { useFormatDatetime } from 'weplay-core/hooks/useFormatDatetime'

import Icon from 'weplay-components/Icon'
import PremiumSupportButton from 'weplay-components/PremiumSupportButton/PremiumSupportButton'
import UnsubscribePremiumButton from 'weplay-components/UnsubscribePremiumButton/UnsubscribePremiumButton'

import styles from './styles.scss'

const BlockForPremiumUser = () => {
  const t = useTranslation()
  const formatDatetime = useFormatDatetime()
  const expirePremiumAccountDate = useSelector(expirePremiumAccountDateSelector)
  const isDiscordConnected = useSelector(isDiscordConnectedSelector)
  return (
    <>
      <p className={styles.text}>
        {t('competitive.profile.premium.hasPremiumUntil')}
        <span className={styles.date}>
          {formatDatetime(expirePremiumAccountDate, { formatKey: 'short' })}
        </span>
      </p>
      <div>
        {isDiscordConnected && (
          <div className={styles.check}>
            <Icon
              iconName="check"
              className="u-mr-1"
            />
            <p className={styles.text}>
              {t('competitive.profile.premium.discordConnected')}
            </p>
          </div>
        )}
        <PremiumSupportButton />
        <UnsubscribePremiumButton />
      </div>
    </>
  )
}
export default React.memo(BlockForPremiumUser)
