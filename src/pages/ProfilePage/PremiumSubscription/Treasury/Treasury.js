import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import { zendeskLinks } from 'weplay-core/config'
import { formatPrizeWithDigit } from 'weplay-core/helpers/formatPrizeWithDigits'

import Link from 'weplay-components/Link'

import styles from './styles.scss'

const Treasury = ({
  usdAmount,
  wpPointsAmount,
}) => {
  const t = useTranslation()
  const { locale } = useLocale()
  const zendeskLink = zendeskLinks.whatIsWp[locale]

  return (
    <>
      <p className={styles.treasuryTitle}>
        {t('competitive.profile.premium.treasury.title')}
      </p>
      {Boolean(wpPointsAmount) && (
        <div className={styles.treasuryText}>
          <span>{t('cabinet.walletWidget.wpPoints')}</span>
          <span>{`${formatPrizeWithDigit(wpPointsAmount)} WP`}</span>
        </div>
      )}
      {Boolean(usdAmount) && (
        <div className={styles.treasuryText}>
          <span>{t('cabinet.walletWidget.money')}</span>
          <span>{`${formatPrizeWithDigit(usdAmount)}$`}</span>
        </div>
      )}
      <div className={styles.divider} />
      <Link
        to={zendeskLink}
        isExternal
      >
        {t('competitive.profile.premium.treasury.howToSpendIt')}
      </Link>
    </>
  )
}

Treasury.propTypes = {
  usdAmount: PropTypes.number,
  wpPointsAmount: PropTypes.number,
}
Treasury.defaultProps = {
  usdAmount: 0,
  wpPointsAmount: 0,
}

export default Treasury
