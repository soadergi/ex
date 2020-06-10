import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import Icon from 'weplay-components/Icon'
import Avatar from 'weplay-components/Avatar'

import BetProviderLogo from 'weplay-events/components/BetProviderLogo'
import BetProviderPlayerCoefficient from 'weplay-events/components/BetProviderPlayerCoefficient'

import styles from './styles.scss'

const avatarResponsive = {
  md: '64',
}

const DefaultGroupTableRow = ({
  // required props
  isWinner,
  participant,

  // optional props
  coefficient,
  cellClassName,
  stageTitle,
}) => (
  <tr className={classNames(
    styles.participant,
    styles[stageTitle],
  )}
  >
    <td className={classNames(
      styles.cell,
      cellClassName,
    )}
    >
      <div className={styles.user}>
        <Avatar
          size="48"
          responsive={avatarResponsive}
          avatar={participant.picture}
          className={styles.userAvatar}
          hasDarkBackground
        />
        <div className={styles.userName}>{participant.nickname}</div>
      </div>
    </td>

    <td className={classNames(
      styles.cell,
      cellClassName,
    )}
    >
      <BetProviderLogo
        className={classNames(
          styles.betLogo,
          'u-mb-0',
        )}
      />

      {false && (
      <BetProviderPlayerCoefficient
        coefficient={coefficient}
      />
      )}
    </td>

    <td className={classNames(
      styles.cell,
      cellClassName,
    )}
    >
      {isWinner && (
        <Icon
          iconName="play-off"
          className={styles.icon}
        />
      )}
    </td>

    <td className={classNames(
      styles.cell,
      styles.points,
      cellClassName,
    )}
    >
      <span className={styles.data}>
        {participant.points}
      </span>
    </td>

    <td className={classNames(
      styles.cell,
      styles.score,
      cellClassName,
    )}
    >
      <span className={styles.data}>
        {`${participant.score.a} - ${participant.score.b}`}
      </span>
    </td>
  </tr>
)

DefaultGroupTableRow.propTypes = {
  // required props
  isWinner: PropTypes.bool.isRequired,
  participant: PropTypes.shape({
    picture: PropTypes.string,
    nickname: PropTypes.string,
    points: PropTypes.string,
    score: PropTypes.shape({
      a: PropTypes.string,
      b: PropTypes.string,
      gameWin: PropTypes.number,
      gameLose: PropTypes.number,
      matchWin: PropTypes.number,
      matchLose: PropTypes.number,
    }),
  }).isRequired,

  // optional props
  cellClassName: PropTypes.string,
  coefficient: PropTypes.string,
  stageTitle: PropTypes.string,
}

DefaultGroupTableRow.defaultProps = {
  // optional props
  cellClassName: '',
  coefficient: '',
  stageTitle: '',
}

export default React.memo(DefaultGroupTableRow)
