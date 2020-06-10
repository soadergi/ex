import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from 'weplay-components/Icon'
import NotificationLabel from 'weplay-components/NotificationLabel'

import container from './container'
import styles from './styles.scss'

const PrizeSection = ({
  // required props
  item,
  // container props
  countParticipants,
  totalStyle,
  progressStyle,
  isActive,
  wasPassed,
  allPassed,
  wasPassedStyle,
  // optional props
}) => (
  <li
    className={classNames(
      styles.item,
      {
        [styles.isActive]: isActive || wasPassed,
        [styles.isCurrent]: isActive,
      },
    )}
  >
    <span className={classNames(
      styles.money,
      styles.data,
    )}
    >
      {
        item.isBegin
          ? (
            <Icon
              iconName="prize"
              className={styles.icon}
            />
          )
          : `$${item.money}`
      }
    </span>

    <NotificationLabel
      className={styles.notification}
      color={countParticipants > item.minPosition ? 'isNotify' : 'isDisabled'}
      isActive={isActive}
    />

    <span className={classNames(
      styles.minPosition,
      styles.data,
    )}
    >
      {
        item.isBegin
          ? (
            <Icon
              iconName="team"
              className={styles.icon}
            />
          )
          : item.minPosition
      }
    </span>

    {
      (isActive && !allPassed) && (
        <>
          <span
            className={styles.total}
            style={totalStyle}
          >
            {countParticipants}
          </span>
          <div
            className={styles.progress}
            style={progressStyle}
          />
        </>
      )
    }

    {
      (item.isBegin && countParticipants === 1) && (
        <>
          <span
            className={styles.total}
            style={totalStyle}
          >
            {countParticipants}
          </span>
          <div
            className={styles.progress}
            style={progressStyle}
          />
        </>
      )
    }

    {
      (wasPassed || allPassed) && (
      <div
        className={styles.progress}
        style={wasPassedStyle}
      />
      )
    }

  </li>

)

PrizeSection.propTypes = {
  // required props
  item: PropTypes.shape({
    money: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    isBegin: PropTypes.bool,
    minPosition: PropTypes.number,
    maxPosition: PropTypes.number,
  }).isRequired,
  countParticipants: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  wasPassed: PropTypes.bool.isRequired,
  allPassed: PropTypes.bool.isRequired,
  totalStyle: PropTypes.shape({}).isRequired,
  progressStyle: PropTypes.shape({}).isRequired,
  wasPassedStyle: PropTypes.shape({}).isRequired,
  // container props

  // optional props
}

PrizeSection.defaultProps = {
  // optional props
}

export default container(PrizeSection)
