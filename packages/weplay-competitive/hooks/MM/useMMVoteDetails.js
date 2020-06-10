import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { capitalizeFirstLetter } from 'weplay-core/helpers/capitalizeFirstLetter'

import { currentMemberSelector } from 'weplay-competitive/reduxs/members/selectors'

const useMMVoteDetails = ({ vote }) => {
  const currentMember = useSelector(currentMemberSelector)

  const [stepName, stepSide] = useMemo(
    () => vote.status.split('_'),
    [vote],
  )
  const [votingMemberId] = useMemo(
    () => vote[`team${capitalizeFirstLetter(stepSide)}`],
    [vote, stepSide],
  )
  const canCurrentMemberVote = useMemo(
    () => currentMember.id === votingMemberId,
    [currentMember, votingMemberId],
  )
  return {
    votingMemberId,
    canCurrentMemberVote,
    stepName,
    stepSide,
  }
}

export default useMMVoteDetails
