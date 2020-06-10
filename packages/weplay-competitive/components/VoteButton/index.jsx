import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import ChoiceButton from 'weplay-competitive/components/ChoiceButton'
import { LOBBY_MAP_VOTES } from 'weplay-competitive/constants/lobbyMapVotes'

const VoteButton = ({
  // required props
  vote,
  currentLobbyMapVote,
  icon,

  // container props
  onVote,

  // optional props
  isDropped,
}) => {
  const t = useTranslation()
  return currentLobbyMapVote === vote && (
    <ChoiceButton
      icon={icon}
      clickHandler={onVote}
      text={t(`competitive.match.mapVoting.buttons.${vote}`)}
      isDropped={isDropped}
    />
  )
}

VoteButton.propTypes = {
  // required props
  vote: PropTypes.oneOf(R.values(LOBBY_MAP_VOTES)).isRequired,
  currentLobbyMapVote: PropTypes.oneOf(R.values(LOBBY_MAP_VOTES)).isRequired,
  onVote: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,

  // container props

  // optional props
  isDropped: PropTypes.bool,
}

VoteButton.defaultProps = {
  // optional props
  isDropped: false,
}

export default VoteButton
