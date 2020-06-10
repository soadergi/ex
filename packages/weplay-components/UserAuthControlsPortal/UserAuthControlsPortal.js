import React, { useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'

import useAction from 'weplay-core/helpers/useAction'
import { triggerSignUpModal } from 'weplay-core/reduxs/_legacy/modals/actions'
import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'

import UserAuthControls from './UserAuthControls/UserAuthControls'

const isClient = typeof window !== 'undefined'
const UserAuthControlsPortal = ({
  // required props
  // container props
  // optional props
}) => {
  const globalScope = useSelector(globalScopeSelector)
  const { openSignUpModal } = useAction({ openSignUpModal: triggerSignUpModal })

  const handleSighUpButtonClick = useCallback(() => openSignUpModal(), [openSignUpModal])

  const targetNode = globalScope.document.getElementById('UserAuthControlsPortal')
  return isClient && targetNode && createPortal(
    <UserAuthControls handleSignUpButtonClick={handleSighUpButtonClick} />,
    targetNode,
  )
}

UserAuthControlsPortal.propTypes = {
  // required props
  // container props
}

UserAuthControlsPortal.defaultProps = {
  // optional props
}

export default UserAuthControlsPortal
