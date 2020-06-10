import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'
import { useParams } from 'weplay-singleton/RouterProvider/useParams'

import { $prop } from 'weplay-core/$utils/$prop'
import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

import useDiscipline from 'weplay-competitive/hooks/useDiscipline'

import { useQueryMemberAllInfo } from './useQueryMemberAllInfo'

export const useMemberAllInfo = () => {
  const isLoggedIn = useSelector(isLoggedInSelector)
  const { memberId } = useParams()
  const { locale } = useLocale()
  const { discipline } = useDiscipline()

  const [matchesIds, setMatchesIds] = useState([])
  const [amountMatches, setAmountMatches] = useState(0)
  const [memberTournamentsIds, setMemberTournamentsIds] = useState([])
  const [amountMemberTournaments, setAmountMemberTournaments] = useState(0)

  const queryMemberAllInfo = useQueryMemberAllInfo()

  useEffect(
    () => {
      queryMemberAllInfo()
        .then(([matchResponse, totalMatches, tournamentsResponse]) => {
          setMatchesIds(matchResponse.map($prop('id')))
          setAmountMatches(totalMatches)
          setMemberTournamentsIds(tournamentsResponse.data.map($prop('id')))
          setAmountMemberTournaments(tournamentsResponse.meta.pagination.total)
        })
    },
    [discipline, locale, isLoggedIn, memberId],
  )
  return {
    matchesIds,
    amountMatches,
    memberTournamentsIds,
    amountMemberTournaments,
  }
}
