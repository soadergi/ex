import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import {
  newTPTournamentsActions,
  newTPTournamentsSelectors,
} from 'weplay-competitive/newTP/redux/tournaments/tournaments'

export const useTournament = (id) => {
  const dispatch = useDispatch()
  const { locale } = useLocale()
  useEffect(() => {
    dispatch(newTPTournamentsActions.findRecord.request({ id }))
  }, [dispatch, id, locale])
  return useSelector(newTPTournamentsSelectors.createRecordByIdSelector(id))
}
