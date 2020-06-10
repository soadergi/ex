import React, { createContext, useContext, useMemo } from 'react'
import PropTypes from 'prop-types'

const defaultValue = {
  matchId: null,
  setMatchId: () => {},
}

const MatchDetailsContext = createContext(defaultValue)

export const useMatchDetails = () => useContext(MatchDetailsContext)

const MatchDetailsProvider = ({ matchId, setMatchId, children }) => {
  const value = useMemo(() => ({
    matchId, setMatchId,
  }), [matchId, setMatchId])

  return (
    <MatchDetailsContext.Provider value={value}>
      {children}
    </MatchDetailsContext.Provider>
  )
}

MatchDetailsProvider.propTypes = {
  matchId: PropTypes.string,
  setMatchId: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

MatchDetailsProvider.defaultProps = {
  matchId: null,
}

export default React.memo(MatchDetailsProvider)
