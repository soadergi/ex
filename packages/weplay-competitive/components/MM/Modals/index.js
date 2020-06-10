import React from 'react'

import useMMQueue from 'weplay-competitive/hooks/MM/useMMQueue'
import useMMSettings from 'weplay-competitive/hooks/MM/useMMSettings'
import useMMCheckIn from 'weplay-competitive/hooks/MM/useMMCheckIn'
import useMMActiveMatch from 'weplay-competitive/hooks/MM/useMMActiveMatch'

import MMSettings from './MMSettings/MMSettings'
import MMSearch from './MMSearch/MMSearch'
import MMCheckIn from './MMCheckIn/MMCheckIn'

const MMModals = () => {
  const { isMMQueueActive } = useMMQueue()
  const { isActiveMMSettingsModal, closeMMSettingsModal } = useMMSettings()
  const { activeMMMatch } = useMMActiveMatch()
  const { isActiveMMCheckInModal } = useMMCheckIn(activeMMMatch)

  return (
    <>
      {isActiveMMSettingsModal && (
        <MMSettings
          isShown={isActiveMMSettingsModal}
          onCloseModal={closeMMSettingsModal}
        />
      )}
      {isMMQueueActive && (
        <MMSearch
          isShown={isMMQueueActive}
        />
      )}
      {isActiveMMCheckInModal && (
        <MMCheckIn />
      )}
    </>
  )
}

export default MMModals
