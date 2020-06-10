import React, { useMemo } from 'react'
import AlternateHead from 'components/AlternateHead/AlternateHead'
import FutureProject from '_dynamic-pages/project/FutureProject/FutureProject'
import CompletedProject from '_dynamic-pages/project/CompletedProject/CompletedProject'
import { idToBrandIntegrationTag } from '_dynamic-pages/project/mocks/idToBrandIntegrationTag'
import { ABOUT_DOTA_2_BANNERS_IDS } from 'config/banners'
import { normalizePESTournamentData } from 'helpers/normalizePESTournamentData'
import {
  getNewspapers,
  getBrandIntegrationNewspapers,
} from 'helpers/newspaperHelpers'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import { createNewspapersByTagIdSelector } from 'weplay-core/reduxs/news/reducer'
import { axios } from 'weplay-core/services/axios'

import { tournamentActions } from 'weplay-events/reduxs/tournament'

import { slugToProjectId } from './mocks/slugToProjectId'

const B2B_OTHER_NEWS_TAG_ID = 1440
const PROMO_PROJECT_SLUG = 'tug-of-war-mad-moon'
const PROMO_PROJECT_LOKALISE_KEY = 'madMoon'
const completedPESProjects = [
  'weplay-bukovel-minor-2020',
]

const ProjectPage = ({
  initialNewspapers,
  initialBrandIntegrationNews,
  tournament,
  id,
  router,
  isPromoProject,
}) => {
  const { locale } = useLocale()
  const promoProjectBannerId = ABOUT_DOTA_2_BANNERS_IDS[locale]
  const alternateLinks = useMemo(() => ({
    ru: `https://about.weplay.tv/ru/projects/${router.query.nameAndId}`,
    en: `https://about.weplay.tv/projects/${router.query.nameAndId}`,
  }), [router.query.nameAndId])

  return (
    <>
      <AlternateHead links={alternateLinks} />

      {isPromoProject ? (
        <FutureProject
          futureProject={tournament}
          outerTranslationKey={PROMO_PROJECT_LOKALISE_KEY}
          outerBannerId={promoProjectBannerId}
        />
      ) : (
        <CompletedProject
          initialNewspapers={initialNewspapers}
          initialBrandIntegrationNews={initialBrandIntegrationNews}
          project={tournament}
          id={id}
          router={router}
        />
      )}
    </>
  )
}
// TODO maybe need to move getInitialProps to separate file
ProjectPage.getInitialProps = async ({ initialLocale, ctx }) => {
  const slug = ctx.query.nameAndId
  const isPromoProject = slug === PROMO_PROJECT_SLUG
  const projectId = slugToProjectId[slug]
  const brandIntegrationTagId = idToBrandIntegrationTag[projectId]
  const store = ctx.store.getState()

  const newspapers = store
    |> createNewspapersByTagIdSelector(B2B_OTHER_NEWS_TAG_ID, initialLocale)
  const brandIntegrationNewspapers = store
    |> createNewspapersByTagIdSelector(brandIntegrationTagId, initialLocale)

  const isNewspapersExists = Boolean(newspapers.length)
  const isBrandIntegrationNewspapersExists = Boolean(brandIntegrationNewspapers.length)

  const initialNewspapers = isNewspapersExists
    ? newspapers
    : await getNewspapers({ ctx, initialLocale })
      .then(res => res.data)
  const initialBrandIntegrationNews = isBrandIntegrationNewspapersExists
    ? brandIntegrationNewspapers
    : await getBrandIntegrationNewspapers({ ctx, initialLocale, brandIntegrationTagId })
      .then(res => res.data)

  const requestCompletedProject = !projectId
    ? Promise.resolve({ data: { data: { id: 0, partners: [] } } })
    : axios.get(`/events-service/tournaments/${projectId}`)

  // TODO: we don't have first reshuffle in service, add to PES when all are ready
  const tournamentPromise = isPromoProject || completedPESProjects.includes(slug)
    ? tournamentActions.queryRecords
      .request({
        'filter[slug]': slug,
        included: 'discipline,tournament_companies',
      })(ctx.store.dispatch, ctx.store.getState)
    : requestCompletedProject

  const tournament = isPromoProject || completedPESProjects.includes(slug)
    ? await tournamentPromise.then(res => normalizePESTournamentData(res))
    : await tournamentPromise.then(res => res?.data?.data)

  return {
    // response data
    initialNewspapers,
    initialBrandIntegrationNews,
    tournament,
    // props data
    router: ctx.router,
    id: projectId,
    isPromoProject,
  }
}

export default ProjectPage
