import React from 'react'
import classNames from 'classnames'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import Icon from 'weplay-components/Icon'

import styles from './styles.scss'

const Legend = () => {
  const t = useTranslation()

  return (
    <ul className={styles.block}>
      <li className={styles.item}>
        <span className={classNames(
          styles.icon,
          styles.roundIcon,
          styles.isSuccess,
        )}
        />
        {t('competitive.tournaments.statuses.ONGOING')}
      </li>
      <li className={styles.item}>
        <span className={classNames(
          styles.icon,
          styles.roundIcon,
          styles.isError,
        )}
        />
        {t('competitive.tournaments.statuses.CANCELED')}
      </li>
      <li className={styles.item}>
        <Icon
          iconName="skull"
          className={classNames(
            styles.icon,
            styles.skull,
          )}
        />
        {t('competitive.tournament.legend.techDefeat')}
      </li>
      <li className={styles.item}>
        <Icon
          iconName="mouseClick"
          className={classNames(
            styles.icon,
            styles.mouse,
          )}
        />
        {t('competitive.tournament.legend.tip')}
      </li>
    </ul>
  )
}

Legend.propTypes = {
  // required props
  // container props
  // optional props
}

Legend.defaultProps = {
  // optional props
}

export default Legend
