import React from 'react'

export const ActiveParticipantContext = React.createContext({
  activeParticipantId: undefined,
  setActiveParticipantId: () => {},
})
