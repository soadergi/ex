import { useCallback } from 'react'

import useShowHideList from 'weplay-events/hooks/useShowHideList'
import useScrollIntoView from 'weplay-events/hooks/useScrollIntoView'

function useMatchListShowHideButton(sortedByDateGridMatches) {
  const [isMatchesListOpened, setMatchesListOpened, gridMatches] = useShowHideList(sortedByDateGridMatches)
  const [ref, scrollIntoView] = useScrollIntoView()

  const toggleOpenMatchesList = useCallback(() => {
    if (isMatchesListOpened) {
      scrollIntoView()
    }
    setMatchesListOpened(!isMatchesListOpened)
  }, [isMatchesListOpened, ref])

  return {
    ref,
    toggleOpenMatchesList,
    isMatchesListOpened,
    gridMatches,
  }
}

export default useMatchListShowHideButton
