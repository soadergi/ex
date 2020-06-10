import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import { $propEq } from 'weplay-core/$utils/$propEq'
import useAction from 'weplay-core/helpers/useAction'

import { tournamentSelectors, tournamentActions } from 'weplay-events/reduxs/tournament'

export const useProjectBySlug = ({
  slug,
}) => {
  const { locale } = useLocale()
  const { getTournamentBySlug } = useAction({ getTournamentBySlug: tournamentActions.queryRecords.request })
  const projectsBySlug = tournamentSelectors.createRecordsByFilterSelector(() => $propEq('slug', slug))
  const project = useSelector(projectsBySlug)?.[0]
  useEffect(() => {
    getTournamentBySlug({
      'filter[slug]': slug || 'fuck',
    })
  }, [getTournamentBySlug, locale, slug])
  return project
}
