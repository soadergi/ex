import { useMemo } from 'react'

const useMMPickOrBanItemStatus = ({ voteItem }) => {
  const wasVoted = useMemo(
    () => Boolean(voteItem.users.length),
    [voteItem],
  )

  const votedItemStatus = useMemo(
    () => (wasVoted ? voteItem.status.split('_')[1] : null),
    [voteItem],
  )

  return {
    wasVoted,
    votedItemStatus,
  }
}

export default useMMPickOrBanItemStatus
