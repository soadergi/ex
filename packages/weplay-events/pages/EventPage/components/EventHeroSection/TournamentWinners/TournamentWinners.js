import React from 'react'
import PropTypes from 'prop-types'

import TournamentWinner from './TournamentWinner/TournamentWinner'
import useTournamentWinner from './useTournamentWinner'
import styles from './styles.scss'

function TournamentWinners({ tournamentId }) {
  const { winner, prize } = useTournamentWinner(tournamentId)

  return (
    <div className={styles.block}>
      <TournamentWinner
        winner={winner}
        prize={prize}
      />
    </div>
  )
}

TournamentWinners.propTypes = {
  tournamentId: PropTypes.string.isRequired,
}

export default React.memo(TournamentWinners)
