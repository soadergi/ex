import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Icon from 'weplay-components/Icon'

import styles from './ItemTooltip.scss'

const ItemTooltip = ({
  title,
  cost,
  bonuses,
  text,
  label,
  property,
  mana,
  time,
  color,
}) => (
  <div className={styles.block}>
    <p className={styles.title}>{title}</p>
    <p className={styles.cost}>
      <Icon
        iconName="money"
        className={styles.icon}
      />
      {cost}
    </p>
    <p className={classNames(
      styles.bonuses,
      styles[color],
    )}
    >
      {bonuses}
    </p>
    <p className="u-mb-1">{text}</p>
    {mana && (
      <div className={styles.reload}>
        <div className={styles.mana}>
          <Icon
            iconName="water"
            className={styles.icon}
          />
          <span>{mana}</span>
        </div>
        <div className={styles.time}>
          <Icon
            iconName="clock"
            className={styles.icon}
          />
          <span>{time}</span>
        </div>
      </div>
    )}
    <ul className={styles.list}>
      <li className={styles.properties}>
        <span className={styles.label}>{label}</span>
        <span>{property}</span>
      </li>
      <li className={styles.properties}>
        <span className={styles.label}>{label}</span>
        <span>{property}</span>
      </li>
    </ul>
  </div>
)

ItemTooltip.propTypes = {
  title: PropTypes.string.isRequired,
  cost: PropTypes.string.isRequired,
  bonuses: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  property: PropTypes.string.isRequired,
  // optional props
  mana: PropTypes.string,
  time: PropTypes.string,
  color: PropTypes.string,
}

ItemTooltip.defaultProps = {
  mana: '',
  time: '',
  color: '',
}

export default ItemTooltip
