import React from 'react'
import PropTypes from 'prop-types'

import MatchCell from '../MatchCell/MatchCell'

import styles from './MatchRow.scss'

const MatchRow = ({ matches, withDuplicates, onMatchClick }) => (
  <div className={styles.block}>
    {matches.map(match => (
      <MatchCell
        key={match.id}
        match={match}
        withDuplicates={withDuplicates}
        onMatchClick={onMatchClick}
      />
    ))}
  </div>
)

MatchRow.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  withDuplicates: PropTypes.bool.isRequired,
  onMatchClick: PropTypes.func.isRequired,
}

export default React.memo(MatchRow)
