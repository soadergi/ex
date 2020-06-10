import React, {
  useCallback,
  useState,
  useEffect,
} from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { useParams } from 'weplay-singleton/RouterProvider/useParams'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import useAction from 'weplay-core/helpers/useAction'
import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { openLoginModal } from 'weplay-core/reduxs/_legacy/modals/actions'

import Button, { BUTTON_COLOR, BUTTON_PRIORITY } from 'weplay-components/Button'

export const OpenVoteButton = ({
  toggleVotingCandidatesVisible,
  isOpened,
  className,
}) => {
  const t = useTranslation()
  const { tournamentSlug } = useParams()
  const isLoggedIn = useSelector(isLoggedInSelector)
  const { openLogin } = useAction({ openLogin: openLoginModal })
  const [isLogInModalOpened, setIsLogInModalOpened] = useState(false)

  const handleClick = useCallback(
    () => {
      if (!isLoggedIn) {
        openLogin()
        setIsLogInModalOpened(true)
        return
      }

      toggleVotingCandidatesVisible()
    },
    [isLoggedIn, toggleVotingCandidatesVisible],
  )

  useEffect(
    () => {
      if (isLogInModalOpened && isLoggedIn) {
        setIsLogInModalOpened(false)
        toggleVotingCandidatesVisible()
      }
    },
    [isLogInModalOpened, isLoggedIn],
  )

  return (
    <Button
      className={className}
      color={BUTTON_COLOR.CTA}
          // TODO: @Tony need to think and add condition isLoggedIn here
      priority={isOpened ? BUTTON_PRIORITY.SECONDARY : null}
      type="button"
      onClick={handleClick}
    >
      {/* TODO: @Tony need to think and add condition isLoggedIn here */}
      {isOpened
        ? t('events.MVPVotingBanner.MVPCandidates.buttonHide')
        : t(`events.${tournamentSlug}.MVPVotingBanner.buttonText`)}
    </Button>
  )
}

OpenVoteButton.propTypes = {
  toggleVotingCandidatesVisible: PropTypes.func.isRequired,
  isOpened: PropTypes.bool.isRequired,

  // optional props
  className: PropTypes.string,
}

OpenVoteButton.defaultProps = {
  className: '',
}

export default OpenVoteButton
