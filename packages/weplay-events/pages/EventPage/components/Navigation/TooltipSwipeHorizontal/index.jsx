import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Icon from 'weplay-components/Icon'

import styles from './styles.scss'

const TooltipSwipeHorizontal = () => {
  const t = useTranslation()

  return (
    <div className={styles.block}>
      <Icon
        className={styles.icon}
        iconName="finger"
        size="large"
      />

      <p className={styles.title}>{t('events.tooltipSwipeHorizontal.title')}</p>
    </div>
  )
}

TooltipSwipeHorizontal.propTypes = {}

export default React.memo(TooltipSwipeHorizontal)
