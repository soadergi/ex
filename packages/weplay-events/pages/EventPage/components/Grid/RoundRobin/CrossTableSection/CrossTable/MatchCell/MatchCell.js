import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './MatchCell.scss'

const MatchCell = ({ match, withDuplicates, onMatchClick }) => {
  if (match.separator) {
    return (
      <div
        className={classNames(
          styles.cell,
          styles.isEmpty,
          { [styles.isHidden]: !withDuplicates },
        )}
      />
    )
  }

  if (match.scoreA === null || match.scoreB === null) {
    return (
      <div
        className={classNames(
          styles.cell,
          { [styles.isHidden]: !withDuplicates && match.isDuplicate },
        )}
      >
        {' '}
      </div>
    )
  }

  const scoreString = `${match.scoreA} - ${match.scoreB}`
  const isWin = match.scoreA > match.scoreB

  return (
    <div
      className={classNames(
        styles.cell,
        { [styles.isWinner]: isWin },
        { [styles.isLoser]: !isWin },
        { [styles.isHidden]: !withDuplicates && match.isDuplicate },
        { [styles.isNotHover]: false },
      )}
      onClick={() => onMatchClick(match.matchId)}
    >
      <span className={styles.score}>
        {scoreString}
      </span>
    </div>
  )
}

MatchCell.propTypes = {
  match: PropTypes.shape({
    matchId: PropTypes.string,
    id: PropTypes.string.isRequired,
    scoreA: PropTypes.number,
    scoreB: PropTypes.number,
    isDuplicate: PropTypes.bool,
    separator: PropTypes.bool,
  }).isRequired,
  withDuplicates: PropTypes.bool.isRequired,
  onMatchClick: PropTypes.func.isRequired,
}

export default React.memo(MatchCell)
