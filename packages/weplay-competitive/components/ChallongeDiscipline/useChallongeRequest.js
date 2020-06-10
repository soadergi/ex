import { useEffect, useState } from 'react'

import useAction from 'weplay-core/helpers/useAction'

import { getChallonge } from 'weplay-competitive/reduxs/challonge/actions'
import useDiscipline from 'weplay-competitive/hooks/useDiscipline'

const queryChallongeParams = {
  createdAfter: '2019-08-25',
  subdomain: 'weplayesports',
}

const useChallongeRequest = () => {
  const { tournamentDiscipline } = useDiscipline()
  const [isLoading, setIsLoading] = useState(false)
  const [fetchedRecords, updateFetchedData] = useState([])
  const { queryChallonge } = useAction({ queryChallonge: getChallonge.request })
  const challongeGameName = tournamentDiscipline?.challonge?.responseGameName

  useEffect(() => {
    setIsLoading(true)
    queryChallonge({
      params: {
        action: 'tournaments',
        'params[created_after]': queryChallongeParams.createdAfter,
        'params[subdomain]': queryChallongeParams.subdomain,
        'filters[game_name]': challongeGameName,
      },
    })
      .then(updateFetchedData)
      .catch(() => updateFetchedData([]))
      .finally(() => setIsLoading(false))
  }, [challongeGameName])
  return {
    isLoading,
    fetchedRecords,
  }
}
export default useChallongeRequest
