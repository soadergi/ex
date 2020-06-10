import React from 'react'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'

import Button, { BUTTON_COLOR, BUTTON_SIZE } from 'weplay-components/Button'

import styles from './styles.scss'

const BlockForRegularUser = () => {
  const t = useTranslation()
  const premiumLink = pathWithParamsByRoute(NAMES.PREMIUM)
  return (
    <>
      <p className={styles.text}>
        {t('competitive.profile.premium.premiumInfo')}
      </p>
      <Button
        color={BUTTON_COLOR.BLACK}
        size={BUTTON_SIZE.LG}
        icon="premium"
        className={classNames(
          styles.isPremium,
          'u-mb-2',
        )}
        href={premiumLink}
      >
        {t('competitive.profile.premium.goPremiumBtn')}
      </Button>
    </>
  )
}
export default React.memo(BlockForRegularUser)
