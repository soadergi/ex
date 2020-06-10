import React, { useEffect, useMemo } from 'react'

import ProjectStats from '_dynamic-pages/project/components/ProjectStats/ProjectStats'
import PartnerWithUs from '_dynamic-pages/project/components/PartnerWithUs/PartnerWithUs'
import BrandOpportunities from '_dynamic-pages/project/components/BrandOpportunities/BrandOpportunities'
import B2BTeamsList from '_dynamic-pages/project/components/B2BTeamsList/B2BTeamList'
import { idToBanner } from '_dynamic-pages/project/mocks/idToBanner'
import { idToTranslationKey } from '_dynamic-pages/project/mocks/idToTranslationKey'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import useAction from 'weplay-core/helpers/useAction'
import { formatPrizeWithDigit } from 'weplay-core/helpers/formatPrizeWithDigits'

import TournamentIdProvider from 'weplay-events/pages/EventPage/CurrentTournamentIdProvider'
import { participantsActions } from 'weplay-events/reduxs/participants'
import { tournamentTeamActions } from 'weplay-events/reduxs/tournamentTeam'
import { tournamentPlayerActions } from 'weplay-events/reduxs/tournamentPlayer'

import BigBanner from 'weplay-media/components/BigBanner'

import SeoTags from 'components/SeoTags/SeoTags'
import B2BSection from 'components/B2BSection/B2BSection'
import HeroSectionBtb from 'components/HeroSectionBtb/HeroSectionBtb'
import B2BBreadcrumbs from 'components/B2BBreadcrumbs/B2BBreadcrumbs'
import { brand, media, event } from 'components/Services/ServiceSubMenu/services'

import { useBanner } from 'hooks/useBanner'

import Opportunity from '_pages/index/Opportunities/Opportunity/Opportunity'
import ContactUsSection from '_pages/_app/ContactUsModal/ContactUsSection/ContactUsSection'

import classes from './FutureProject.scss'

const FutureProject = ({
  futureProject,
  outerTranslationKey,
  outerBannerId,
}) => {
  const {
    id,
    attributes: {
      labels,
      startDate,
      endDate,
      fullName,
      backgroundUrl,
      prizePool,
      logoUrl,
    },
  } = futureProject
  const tournamentId = id
  const { locale } = useLocale()
  const bannerId = outerBannerId ?? idToBanner?.[tournamentId]?.[locale]
  const banner = useBanner(bannerId)
  const t = useTranslation()
  const translationKey = outerTranslationKey ?? idToTranslationKey[tournamentId]
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
  const tabs = useMemo(() => [
    {
      id: 1,
      title: t('services.brandIntegration.title'),
      services: brand,
    }, {
      id: 2,
      title: t('services.mediaRights.title'),
      services: media,
    }, {
      id: 3,
      title: t('services.eventProduction.title'),
      services: event,
    },
  ], [t])
  const items = useMemo(() => [
    {
      number: '01',
      title: t('projectPage.WhyPartnersWithUs.01.title'),
      description: t('projectPage.WhyPartnersWithUs.01.text'),
    }, {
      number: '02',
      title: t('projectPage.WhyPartnersWithUs.02.title'),
      description: t('projectPage.WhyPartnersWithUs.02.text'),
    }, {
      number: '03',
      title: t('projectPage.WhyPartnersWithUs.03.title'),
      description: t('projectPage.WhyPartnersWithUs.03.text'),
    },
  ], [t])
  const stats = useMemo(() => ({
    prizeSum: `$${formatPrizeWithDigit(prizePool)}`,
    expectedViewership: 3000000,
    expectedAirTime: 60,
    expectedNumberOfGames: 60,
    talents: 6,
  }), [prizePool])
  const opportunity = useMemo(() => ({
    innerTitle: t(`projectPage.${translationKey}.description.title`),
    innerText: t(`projectPage.${translationKey}.description.text`),
  }), [t, translationKey])

  const PAGE_LIMIT = 100
  const requestTournamentTeamsOrParticipantsParams = {
    'filter[tournament.id]': tournamentId,
    'page[limit]': PAGE_LIMIT,
  }
  const requestTournamentPlayersParams = {
    ...requestTournamentTeamsOrParticipantsParams,
    included: 'tournament_team',
  }
  const { getParticipantsRequest } = useAction({
    getParticipantsRequest: participantsActions.queryRecords.request,
  })
  const { getTournamentTeamsRequest } = useAction({
    getTournamentTeamsRequest: tournamentTeamActions.queryRecords.request,
  })
  const { getTournamentPlayersRequest } = useAction({
    getTournamentPlayersRequest: tournamentPlayerActions.queryRecords.request,
  })

  useEffect(() => {
    if (tournamentId) {
      getParticipantsRequest(requestTournamentTeamsOrParticipantsParams)
      getTournamentTeamsRequest(requestTournamentTeamsOrParticipantsParams)
      getTournamentPlayersRequest(requestTournamentPlayersParams)
        .then(getTournamentPlayersRequest({
          ...requestTournamentPlayersParams,
          'page[offset]': PAGE_LIMIT,
        }))
    }
  }, [
    tournamentId,
    getParticipantsRequest,
    getTournamentTeamsRequest,
    getTournamentPlayersRequest,
    requestTournamentPlayersParams,
    requestTournamentTeamsOrParticipantsParams])

  return (
    <>
      <SeoTags
        title={t(`projectPage.${translationKey}.seo.title`)}
        description={t(`projectPage.${translationKey}.seo.description`)}
      />
      <div className={classes.heroWrap}>
        <HeroSectionBtb
          labels={labels}
          startDate={startDate}
          endDate={endDate}
          title={fullName}
          image={backgroundUrl}
          isLightTheme
        />
        <ProjectStats
          stats={stats}
        />
      </div>

      <B2BBreadcrumbs allBreadcrumbs={allBreadcrumbs} />

      <B2BSection>
        <Opportunity
          className={classes.projectPage}
          opportunity={opportunity}
          image={logoUrl}
        />
      </B2BSection>

      <B2BSection title={t('projectPage.WhyPartnersWithUs.title')}>
        <PartnerWithUs items={items} />
      </B2BSection>

      <B2BSection title={t('projectPage.teamList.title')}>
        <TournamentIdProvider tournamentId={tournamentId}>
          <B2BTeamsList />
        </TournamentIdProvider>
      </B2BSection>

      <B2BSection title={t('projectPage.BrandOpportunities.title')}>
        <BrandOpportunities tabs={tabs} />
      </B2BSection>

      {banner && (
        <B2BSection>
          <BigBanner banner={banner} />
        </B2BSection>
      )}

      <div className={classes.sectionGrey}>
        <ContactUsSection />
      </div>
    </>
  )
}

export default FutureProject
