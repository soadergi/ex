import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Icon from 'weplay-components/Icon'

import styles from './SuccesTable.scss'

const SuccessTable = ({
  // required props
  userSteam,
  // optional props
}) => {
  const t = useTranslation()
  return (
    <ul className={styles.grid}>
      <li className={styles.item}>
        {t('competitive.tournament.modals.connectGameAndSteam.steamNickname')}
      </li>
      <li className={classNames(
        styles.item,
        styles.title,
      )}
      >
        {userSteam}
      </li>
      <li className={styles.item}>
        {t('competitive.tournament.modals.connectGameAndSteam.status')}
      </li>
      <li className={classNames(
        styles.item,
        styles.isSuccess,
      )}
      >
        <Icon
          iconName="varified"
          className="u-mr-1"
        />
        {t('competitive.tournament.modals.connectGameAndSteam.connected')}
      </li>
    </ul>
  )
}

SuccessTable.propTypes = {
  // required props
  userSteam: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  // optional props
}

SuccessTable.defaultProps = {
  // optional props
}

export default SuccessTable
