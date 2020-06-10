import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Avatar from 'weplay-components/Avatar'
import Icon from 'weplay-components/Icon'

import styles from './styles.scss'
import container from './container'

const avatarResponsive = {
  sm: '48',
  lg: '64',
}

const DotaUnderlordsGroupTableRow = ({
  // required props
  participantScore,
  isWinnerIconVisible,

  // container props
  participant,
  participantInfo,

  // optional props
  cellClassName,
}) => (
  <tr className={styles.block}>
    <td className={classNames(
      styles.cell,
      cellClassName,
    )}
    >
      <div className={styles.user}>
        <Avatar
          size="40"
          avatar={participantInfo.picture}
          responsive={avatarResponsive}
          className={styles.avatar}
        />
        <div className={styles.userWrap}>
          <span className={styles.userTeam}>{participantInfo.team}</span>
          <span className={styles.userName}>{participantInfo.nickname}</span>
        </div>
      </div>
    </td>

    <td className={classNames(
      styles.cell,
      cellClassName,
    )}
    >
      {isWinnerIconVisible && (
        <Icon
          iconName="weplay"
          size="small"
          className={styles.icon}
        />
      )}
    </td>

    {participantScore.map(score => (
      <td
        key={score.label}
        className={classNames(
          styles.cell,
          cellClassName,
        )}
      >
        <span className={styles.data}>
          {score.value}
        </span>
      </td>
    ))}

    <td className={classNames(
      styles.cell,
      cellClassName,
    )}
    >
      <span className={styles.data}>
        {participant.points}
      </span>
    </td>
  </tr>
)

DotaUnderlordsGroupTableRow.propTypes = {
  // required props

  // container props
  isWinnerIconVisible: PropTypes.bool.isRequired,
  participantScore: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  participantInfo: PropTypes.shape({
    team: PropTypes.string,
    nickname: PropTypes.string,
    picture: PropTypes.string,
  }).isRequired,
  participant: PropTypes.shape({
    points: PropTypes.number,
  }).isRequired,

  // optional props
  cellClassName: PropTypes.string,
}

DotaUnderlordsGroupTableRow.defaultProps = {
  // optional props
  cellClassName: '',
}

export default container(DotaUnderlordsGroupTableRow)
