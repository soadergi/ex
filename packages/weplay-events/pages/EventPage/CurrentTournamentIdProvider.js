import React, {
  createContext,
  useContext,
} from 'react'
import PropTypes from 'prop-types'

export const TournamentIdContext = createContext()
export const useCurrentTournamentId = () => useContext(TournamentIdContext)

const CurrentTournamentIdProvider = ({
  tournamentId,
  children,
}) => (
  <TournamentIdContext.Provider value={tournamentId}>
    {children}
  </TournamentIdContext.Provider>
)

CurrentTournamentIdProvider.propTypes = {
  tournamentId: PropTypes.string,
  children: PropTypes.node.isRequired,
}

CurrentTournamentIdProvider.defaultProps = {
  tournamentId: '',
}

export default React.memo(CurrentTournamentIdProvider)
