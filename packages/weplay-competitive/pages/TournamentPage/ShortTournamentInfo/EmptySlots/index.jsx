import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import Icon from 'weplay-components/Icon'

import styles from '../styles.scss'

const EmptySlots = ({
  // required props
  emptySlots,
  totalSlots,
}) => {
  const t = useTranslation()

  return (
    <div className={styles.header}>
      <Icon
        iconName="team"
        className={styles.icon}
      />
      <span
        className={styles.smallText}
        title={t('competitive.tournament.tournamentTeam.title')}
      >
        {`${totalSlots - emptySlots}/${totalSlots}`}
      </span>
    </div>
  )
}

EmptySlots.propTypes = {
  // required props
  emptySlots: PropTypes.number.isRequired,
  totalSlots: PropTypes.number.isRequired,
}

export default EmptySlots
