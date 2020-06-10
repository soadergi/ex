import * as R from 'ramda'

import { useParams } from 'weplay-singleton/RouterProvider/useParams'
import { useLocation } from 'weplay-singleton/RouterProvider/useLocation'

import { DISCIPLINES } from 'weplay-competitive/config/disciplines'

const useDiscipline = () => {
  const { discipline } = useParams()
  const location = useLocation()
  const disciplineKeys = R.keys(DISCIPLINES)
  const disciplineKey = disciplineKeys.find(key => location.pathname.includes(key))

  return ({
    tournamentDiscipline: DISCIPLINES[discipline || disciplineKey] ?? {},
    disciplineName: DISCIPLINES[discipline || disciplineKey]?.name ?? '',
    discipline,
  })
}

export default useDiscipline
