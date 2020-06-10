import React, {
  createContext, useContext, useState,
} from 'react'
import PropTypes from 'prop-types'

export const RefsContext = createContext()
export const useEventsPageRefsProvider = () => useContext(RefsContext)

const EventsPageRefsProvider = ({
  children,
}) => {
  // TODO: Remove this everywhere
  const [streamsBlockRef, setStreamsBlockRef] = useState(null)
  const [calendarBlockRef, setCalendarBlockRef] = useState(null)
  const [participantsBlockRef, setParticipantsBlockRef] = useState(null)

  return (
    <RefsContext.Provider
      value={{
        streamsBlockRef,
        setStreamsBlockRef,
        calendarBlockRef,
        setCalendarBlockRef,
        participantsBlockRef,
        setParticipantsBlockRef,
      }}
    >
      {children}
    </RefsContext.Provider>
  )
}

EventsPageRefsProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
export default React.memo(EventsPageRefsProvider)
