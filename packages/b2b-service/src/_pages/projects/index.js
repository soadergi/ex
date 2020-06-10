import React, { useMemo } from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { $propEq } from 'weplay-core/$utils/$propEq'
import { getSubscriptionBlock } from 'weplay-core/reduxs/subscriptionBlocks/actions'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import SubscriptionBlock from 'weplay-components/SubscriptionBlock'
import HeadLine from 'weplay-components/HeadLine'
import Section, { PADDING_Y } from 'weplay-components/_wrappers/Section'

import { ROOT_PAGE_ID } from 'weplay-events/pages/EventsRootPage/constants'
import { tournamentActions, tournamentSelectors } from 'weplay-events/reduxs/tournament'
import { rootpageActions, rootpageSelectors } from 'weplay-events/reduxs/rootpage'

import B2BBreadcrumbs from 'components/B2BBreadcrumbs/B2BBreadcrumbs'
import HeroSectionBtb from 'components/HeroSectionBtb/HeroSectionBtb'
import AlternateHead from 'components/AlternateHead/AlternateHead'

import CompletedProjects from '_pages/projects/CompletedProjects/CompletedProjects'

import classes from './styles.scss'

const PROMO_PROJECT_SLUG = 'tug-of-war-mad-moon'
const locationPage = 'weplay_business_general'
const subscribeFormModifiers = ['lightTheme']
const PROJECTS_TO_HIDE = [
  'WePlay! Pushka League',
  'WeSave! Charity Play',
  'WePlay! Dota 2 Tug of War: Mad Moon',
  'Forge of Master LAN',
]

const ProjectsPage = ({
  initialArchiveEvents,
  initialPromoProject,
}) => {
  const t = useTranslation()
  const filteredProjects = initialArchiveEvents.filter(project => !PROJECTS_TO_HIDE.includes(project.tournamentTitle))
  const alternateLinks = {
    ru: 'https://about.weplay.tv/ru/projects',
    en: 'https://about.weplay.tv/projects',
  }
  const allBreadcrumbs = useMemo(() => [
    {
      name: t('common.breadcrumbs.home'),
      path: '/',
    },
    {
      name: t('projectsPage.seo.title'),
      path: '/projects',
    },
  ], [t])

  return (
    <>
      <AlternateHead links={alternateLinks} />

      <div className={classes.heroWrap}>
        <HeroSectionBtb
          labels={initialPromoProject?.labels}
          startDate={initialPromoProject?.startDate}
          endDate={initialPromoProject?.endDate}
          title={initialPromoProject?.fullName}
          text={initialPromoProject?.description}
          image={initialPromoProject?.backgroundUrl}
          goToLink={`/projects/${initialPromoProject?.slug}`}
          isLightTheme
        />
      </div>
      <B2BBreadcrumbs allBreadcrumbs={allBreadcrumbs} />
      <Section
        paddingY={PADDING_Y.SM}
      >
        <ContentContainer>
          <HeadLine
            className="u-text-center"
            title={t('projectsPage.completedProjects.title')}
          />
          <CompletedProjects allProjects={filteredProjects} />
        </ContentContainer>
      </Section>

      <Section
        paddingY={PADDING_Y.SM}
        className="u-mb-6"
      >
        <ContentContainer>
          <SubscriptionBlock
            modifiers={subscribeFormModifiers}
            pageName={locationPage}
          />
        </ContentContainer>
      </Section>
    </>
  )
}

ProjectsPage.getInitialProps = async ({ ctx, initialLocale }) => {
  const store = ctx.store.getState()
  const subscriptionPromiseParams = {
    params: {
      language: initialLocale,
      isActive: 1,
      locationPage,
      locationId: 0,
    },
  }

  const promoProject = store
    |> tournamentSelectors.createRecordsByFilterSelector(() => $propEq('slug', PROMO_PROJECT_SLUG))
  const rootPage = store
    |> rootpageSelectors.createRecordByIdSelector(ROOT_PAGE_ID)

  const isPromoProjectExists = Boolean(promoProject.length)
  const isArchiveEventsExists = Boolean(rootPage.isFetched)

  const subscriptionPromise = getSubscriptionBlock
    .request(subscriptionPromiseParams)(ctx.store.dispatch, ctx.store.getState)
  const promoProjectPromise = tournamentActions.queryRecords
    .request({ 'filter[slug]': PROMO_PROJECT_SLUG })(ctx.store.dispatch, ctx.store.getState)
  const rootPagePromise = rootpageActions.findRecord
    .request({ id: ROOT_PAGE_ID })(ctx.store.dispatch, ctx.store.getState)

  const subscription = await subscriptionPromise
    .then(res => res)
    .catch((err) => {
      console.error('subscriptionPromise', err)
      return null
    })
  const initialArchiveEvents = isArchiveEventsExists
    ? rootPage.archiveEvents.events
    : await rootPagePromise
      .then(res => res.data.attributes.archiveEvents.events)
      .catch((err) => {
        console.error(err)
        return null
      })
  const initialPromoProject = isPromoProjectExists
    ? promoProject[0]
    : await promoProjectPromise
      .then(res => ({ ...res.data[0].attributes }))
      .catch((err) => {
        console.error(err)
        return null
      })

  return {
    // response data
    subscription,
    initialArchiveEvents,
    initialPromoProject,
  }
}

export default ProjectsPage
