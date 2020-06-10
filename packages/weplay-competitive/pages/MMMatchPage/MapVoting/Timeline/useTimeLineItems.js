import { useMemo } from 'react'

import { capitalizeFirstLetter } from 'weplay-core/helpers/capitalizeFirstLetter'

const useTimeLineItems = (vote) => {
  const strategyItems = useMemo(
    () => vote?.strategy.split('-') ?? [],
    [vote.strategy],
  )
  return strategyItems.map((strategyItem) => {
    const [action, side] = strategyItem.split('_')
    const [voteMemberId] = action === 'SERVER'
      ? ['SERVER']
      : vote[`team${capitalizeFirstLetter(side)}`]
    return {
      voteMemberId,
      action,
    }
  })
}

export default useTimeLineItems
