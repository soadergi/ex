import { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'

import useAction from 'weplay-core/helpers/useAction'

import { modalsSelector } from 'weplay-competitive/reduxs/modals/reducer'
import { MODALS } from 'weplay-competitive/constants/modals'
import { triggerModal } from 'weplay-competitive/reduxs/modals/actions'

const useMMSettings = () => {
  const activeModal = useSelector(modalsSelector)
  const { triggerModalAction } = useAction({ triggerModalAction: triggerModal })

  const isActiveMMSettingsModal = useMemo(
    () => activeModal === MODALS.MM_SETTINGS,
    [activeModal],
  )
  const openMMSettingsModal = useCallback(
    () => {
      triggerModalAction(MODALS.MM_SETTINGS)
    },
    [triggerModalAction],
  )
  const closeMMSettingsModal = useCallback(
    () => { triggerModalAction('') },
    [triggerModalAction],
  )

  return {
    isActiveMMSettingsModal,
    openMMSettingsModal,
    closeMMSettingsModal,
  }
}

export default useMMSettings
