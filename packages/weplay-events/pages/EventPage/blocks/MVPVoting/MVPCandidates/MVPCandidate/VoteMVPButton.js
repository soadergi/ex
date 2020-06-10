import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { openLoginModal } from 'weplay-core/reduxs/_legacy/modals/actions'
import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

import Button, { BUTTON_COLOR } from 'weplay-components/Button'

import styles from './MVPCandidate.scss'

const VoteMVPButton = ({
  candidate,
  handleVote,
  isAbleToVote,
}) => {
  const t = useTranslation()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(isLoggedInSelector)
  const [isLoading, setLoading] = useState(false)

  const voteForCandidate = useCallback(() => {
    if (!isLoggedIn) {
      dispatch(openLoginModal())
      return
    }
    setLoading(true)
    handleVote(candidate.id)
      .then(() => setLoading(false))
      .catch((error) => {
        setLoading(false)
        console.warn(error)
      })
  }, [dispatch, candidate.id, handleVote, isLoggedIn])

  return (
    <Button
      color={BUTTON_COLOR.BASIC}
      type="button"
      className={styles.button}
      disabled={!(isAbleToVote || !isLoggedIn)}
      isLoading={isLoading}
      onClick={voteForCandidate}
    >
      {t('events.MVPVotingBanner.MVPCandidates.button')}
    </Button>
  )
}

VoteMVPButton.propTypes = {
  candidate: PropTypes.shape({
    id: PropTypes.number.isRequired,
    metaData: PropTypes.shape({}),
  }).isRequired,
  handleVote: PropTypes.func.isRequired,
  isAbleToVote: PropTypes.bool.isRequired,
}

export default React.memo(VoteMVPButton)
