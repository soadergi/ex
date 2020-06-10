import React, { useMemo } from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import AlternateHead from 'components/AlternateHead/AlternateHead'
import B2BSection from 'components/B2BSection/B2BSection'
import B2BBreadcrumbs from 'components/B2BBreadcrumbs/B2BBreadcrumbs'
import Leaders from 'components/Leaders/Leaders'
import LeadershipTeam from 'components/LeadershipTeam/LeadershipTeam'

import Opportunity from '_pages/index/Opportunities/Opportunity/Opportunity'

import classes from './styles.scss'

const aboutUsImage = 'https://static-prod.weplay.tv/2019-10-29/0ff7d4059999dd0629c6a40d4f6e34df.jpeg'

const TeamPage = () => {
  const t = useTranslation()
  const alternateLinks = {
    ru: 'https://about.weplay.tv/ru/team',
    en: 'https://about.weplay.tv/team',
  }
  const allBreadcrumbs = useMemo(() => [
    {
      name: t('common.breadcrumbs.home'),
      path: '/',
    },
    {
      name: t('aboutUsPage.seo.breadcrumbs.about'),
      path: '/about-us',
    }, {
      name: t('teamPage.seo.breadcrumbs.team'),
      path: '/team',
    },
  ], [t])
  const opportunities = useMemo(() => [
    {
      id: 1,
      innerTitle: t('aboutUsPage.opportunities.title'),
      innerText: t('aboutUsPage.opportunities.description'),
      buttonText: t('aboutUsPage.opportunities.button'),
      buttonUrl: 'https://techiia.bamboohr.com/jobs/',
      image: aboutUsImage,
    },
  ], [t])

  return (
    <>
      <AlternateHead links={alternateLinks} />

      <B2BBreadcrumbs allBreadcrumbs={allBreadcrumbs} />

      <B2BSection>
        <h1 className={classes.teamTitle}>{t('teamPage.head.title')}</h1>
        <p className={classes.teamText}>{t('teamPage.head.description')}</p>
      </B2BSection>

      <Leaders />

      <LeadershipTeam />

      <B2BSection sectionClassName="u-mb-6">
        {opportunities.map(opportunity => (
          <Opportunity
            className={classes.aboutUsPage}
            key={opportunity.id}
            opportunity={opportunity}
            image={opportunity.image}
          />
        ))}
      </B2BSection>
    </>
  )
}
export default TeamPage
