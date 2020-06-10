import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import UserAvatar from 'weplay-components/UserAvatar'

import styles from './styles.scss'
import container from './container'

const GroupStageTableRow = ({
  // required props
  participant,
  isWinner,

  // props from container
  isMobileWidth,

  // optional props
  coefficient,
}) => (
  <div className={classNames(
    styles.block,
    { [styles.isWinner]: isWinner },
  )}
  >
    <div className={styles.column}>
      <div className={styles.user}>
        <UserAvatar
          avatar={participant.picture}
          size="32"
          className={styles.userAvatar}
        />
        <div className={styles.userName}>{participant.nickname}</div>
      </div>
    </div>

    <div className={styles.column}>
      <div className={styles.betProvider}>
        <span className={styles.text}>
          {coefficient}
        </span>
      </div>
    </div>

    <div className={classNames(
      styles.column,
      styles.data,
    )}
    >
      {isMobileWidth && (
        <span className={styles.mobileDataTitle}>gameWin</span>
      )}

      <span className={styles.dataText}>
        {participant.score.gameWin}
      </span>
    </div>

    {participant.score.draws && (
      <div className={classNames(
        styles.column,
        styles.data,
      )}
      >
        {isMobileWidth && (
          <span className={styles.mobileDataTitle}>draws</span>
        )}

        <span className={styles.dataText}>
          {participant.score.draws}
        </span>
      </div>
    )}

    {participant.score.gameLoses && (
      <div className={classNames(
        styles.column,
        styles.data,
      )}
      >
        {isMobileWidth && (
          <span className={styles.mobileDataTitle}>gameLoses</span>
        )}

        <span className={styles.dataText}>
          {participant.score.gameLoses}
        </span>
      </div>
    )}

    <div className={classNames(
      styles.column,
      styles.data,
    )}
    >
      {isMobileWidth && (
        <span className={styles.mobileDataTitle}>roundDiffs</span>
      )}

      <span className={styles.dataText}>
        {participant.score.roundDiffs > 0 ? `+${participant.score.roundDiffs}` : participant.score.roundDiffs}
      </span>
    </div>

    <div className={classNames(
      styles.column,
      styles.data,
    )}
    >
      {isMobileWidth && (
        <span className={styles.mobileDataTitle}>RD</span>
      )}
      <span className={styles.dataText}>
        {participant.points}
      </span>
    </div>
  </div>
)

GroupStageTableRow.propTypes = {
  // required props
  participant: PropTypes.shape({
    picture: PropTypes.string,
    nickname: PropTypes.string,
    points: PropTypes.number,
    score: PropTypes.shape({
      gameWin: PropTypes.number,
      draws: PropTypes.number,
      gameLoses: PropTypes.number,
      roundDiffs: PropTypes.number,
    }),
  }).isRequired,
  isWinner: PropTypes.bool.isRequired,

  // props from container
  isMobileWidth: PropTypes.bool.isRequired,

  // optional props
  coefficient: PropTypes.string,
}

GroupStageTableRow.defaultProps = {
  // optional props
  coefficient: '',
}

export default container(GroupStageTableRow)
