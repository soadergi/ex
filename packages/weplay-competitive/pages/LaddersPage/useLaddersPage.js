import { useMemo } from 'react'

import useDiscipline from 'weplay-competitive/hooks/useDiscipline'

export const useLaddersPage = () => {
  const { tournamentDiscipline } = useDiscipline()
  const seoParams = useMemo(() => ({
    discipline: tournamentDiscipline.name,
  }),
  [tournamentDiscipline])

  const backgroundImageStyle = useMemo(() => ({
    backgroundImage: `url(${tournamentDiscipline.backgrounds.mainTournamentsPage ?? ''})`,
  }), [tournamentDiscipline])

  return {
    seoParams,
    tournamentDiscipline,
    backgroundImageStyle,
  }
}
