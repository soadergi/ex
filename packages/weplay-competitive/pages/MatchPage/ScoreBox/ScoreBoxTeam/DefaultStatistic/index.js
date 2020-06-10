import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import imgPropType from 'weplay-core/customPropTypes/imgPropType'

import Icon from 'weplay-components/Icon'
import UserAvatar from 'weplay-components/UserAvatar'

import container from './container'
import styles from './styles.scss'

const defaultStatistic = ({
  // required props
  progress,
  scoreBoxHeadCells,

  // props from container
  defaultStatisticData,
  rotateStyles,
  avatar,
  name,
  isPremiumAccount,
  // optional props
}) => (
  <div className={styles.block}>
    <div className={classNames(
      styles.cell,
      styles.user,
    )}
    >
      <span
        className={styles.iconWrapper}
        style={rotateStyles}
      >
        <Icon
          className={classNames(
            styles.icon,
            {
              [styles.isOpen]: progress > 0,
            },
          )}
          iconName="arrow-expand"
        />
      </span>
      <div className={styles.wrapper}>
        <UserAvatar
          avatar={avatar}
          className={styles.avatar}
          isPremiumAccount={isPremiumAccount}
          size="48"
        />
        <span className={styles.name}>
          {name}
        </span>
      </div>
    </div>
    {scoreBoxHeadCells.map(cell => (
      <div
        className={styles.cell}
        key={cell.name}
      >
        <span className={classNames(
          styles.cell,
          {
            [styles.score]: cell.name === 'score',
          },
        )}
        >
          {defaultStatisticData[cell.name]}
        </span>
      </div>
    ))}
  </div>
)

defaultStatistic.propTypes = {
  // required props
  defaultStatisticData: PropTypes.shape({
    players: PropTypes.arrayOf(PropTypes.shape({})),
    teamId: PropTypes.number,
    score: PropTypes.number,
    userPick: PropTypes.string.isRequired,
    serverPick: PropTypes.string.isRequired,
  }).isRequired,
  progress: PropTypes.number.isRequired,
  rotateStyles: PropTypes.shape({}).isRequired,
  avatar: imgPropType.isRequired,
  name: PropTypes.string.isRequired,
  isPremiumAccount: PropTypes.bool.isRequired,
  scoreBoxHeadCells: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
    }).isRequired,
  ).isRequired,
  // optional props

}

export default container(defaultStatistic)
