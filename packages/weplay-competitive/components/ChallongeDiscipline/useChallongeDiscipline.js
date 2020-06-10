import { useEffect, useMemo } from 'react'

import useDiscipline from 'weplay-competitive/hooks/useDiscipline'

const useChallongeDiscipline = ({
  pageOffset,
  pageLimit,
  filter,
  fetchedRecords,
  setPagination,
}) => {
  const { tournamentDiscipline } = useDiscipline()
  const backgroundSrc = tournamentDiscipline?.backgrounds?.mainTournamentsPage
  const disciplineUrl = tournamentDiscipline?.url

  const seoParams = useMemo(() => ({
    discipline: tournamentDiscipline?.name,
    shortDisciplineName: tournamentDiscipline?.shortName,
  }), [tournamentDiscipline])
  const sortedTournaments = useMemo(() => fetchedRecords.filter(filter), [filter])
  const tournamentsCount = sortedTournaments?.length
  const sortedAndPaginatedTournaments = useMemo(
    () => sortedTournaments.slice(pageOffset, pageOffset + pageLimit),
    [sortedTournaments],
  )

  useEffect(() => {
    setPagination(
      {
        offset: pageOffset,
        limit: pageLimit,
        total: tournamentsCount,
      },
    )
  },
  [tournamentsCount, pageLimit, pageOffset])

  return {
    backgroundSrc,
    seoParams,
    disciplineUrl,
    sortedAndPaginatedTournaments,
    tournamentsCount,
  }
}
export default useChallongeDiscipline
