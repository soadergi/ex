import { useSelector } from 'react-redux'

import { useParams } from 'weplay-singleton/RouterProvider/useParams'

import { $propEq } from 'weplay-core/$utils/$propEq'

import { MMVotesSelectors } from 'weplay-competitive/reduxs/MMVotes'
import { MMGameModesSelectors } from 'weplay-competitive/reduxs/MMGameModes'
import { MMMatchesSelectors } from 'weplay-competitive/reduxs/MMMatches'
import { VOTING_SIDES } from 'weplay-competitive/pages/MMMatchPage/MatchHeader/VotingInfo/VotingInfo'

const getSide = (users, leftMemberId, rightMemberId) => {
  if (users.includes(leftMemberId)) {
    return VOTING_SIDES.LEFT
  }
  if (users.includes(rightMemberId)) {
    return VOTING_SIDES.RIGHT
  }
  return null
}

export const useVotingPool = () => {
  const { matchId } = useParams()

  const match = useSelector(MMMatchesSelectors.createRecordByIdSelector(matchId))
  const MMVote = useSelector(MMVotesSelectors.createRecordByIdSelector(matchId))
  const gameMode = useSelector(MMGameModesSelectors.createRecordByIdSelector(match?.gameModeId))

  const pickOrBanItems = gameMode?.voteItems ?? []
  const voteItems = MMVote?.voteItems ?? []
  const [leftMemberId] = MMVote?.teamLeft ?? []
  const [rightMemberId] = MMVote?.teamRight ?? []

  return voteItems.map((voteItem) => {
    const pickOrBanItem = pickOrBanItems.find($propEq('id', voteItem?.id))
    return {
      id: voteItem.id,
      status: voteItem.status.split('_')[1],
      name: pickOrBanItem?.name,
      side: voteItem.status === 'SERVER_PICK'
        ? VOTING_SIDES.SERVER
        : getSide(voteItem.users, leftMemberId, rightMemberId),
    }
  })
}
