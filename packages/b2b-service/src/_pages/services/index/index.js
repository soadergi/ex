import React, {
  useMemo,
} from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import SubscriptionBlock from 'weplay-components/SubscriptionBlock'
import Section, { PADDING_Y } from 'weplay-components/_wrappers/Section'

import AlternateHead from 'components/AlternateHead/AlternateHead'
import B2BBreadcrumbs from 'components/B2BBreadcrumbs/B2BBreadcrumbs'
import B2BSection from 'components/B2BSection/B2BSection'
import HeroSectionBtb from 'components/HeroSectionBtb/HeroSectionBtb'
import sponsorImage from 'components/Services/img/brand.jpg'
import productionImage from 'components/Services/img/event.jpg'
import rightsImage from 'components/Services/img/media.jpg'

import image from '_pages/index/img/home.jpg'
import Opportunity from '_pages/index/Opportunities/Opportunity/Opportunity'

import classes from './styles.scss'

const locationPage = 'weplay_business_general'
const subscribeFormModifiers = ['lightTheme']

const ServicesPage = () => {
  const t = useTranslation()
  const opportunities = useMemo(() => [
    {
      id: 1,
      innerTitle: t('services.brandIntegration.title'),
      innerText: t('brandIntegrationPage.description'),
      buttonText: t('mainPage.moreInfo.button'),
      buttonUrl: '/services/brand-integration',
      image: sponsorImage,
    }, {
      id: 2,
      innerTitle: t('services.mediaRights.title'),
      innerText: t('mediaRightsPage.description'),
      buttonText: t('mainPage.moreInfo.button'),
      buttonUrl: '/services/media-rights',
      image: rightsImage,
    }, {
      id: 3,
      innerTitle: t('services.eventProduction.title'),
      innerText: t('eventProductionPage.description'),
      buttonText: t('mainPage.moreInfo.button'),
      buttonUrl: '/services/event-production',
      image: productionImage,
    },
  ], [t])
  const alternateLinks = {
    ru: 'https://about.weplay.tv/ru/services',
    en: 'https://about.weplay.tv/services',
  }
  const allBreadcrumbs = useMemo(() => [
    {
      name: t('common.breadcrumbs.home'),
      path: '/',
    },
    {
      name: t('servicesPage.seo.breadcrumbs.services'),
      path: '/services',
    },
  ], [t])
  return (
    <>
      <AlternateHead links={alternateLinks} />

      <div className={classes.heroWrap}>
        <HeroSectionBtb
          title={t('servicesPage.title')}
          text={t('servicesPage.text')}
          buttonText={t('heroSection.button')}
          image={image}
        />
      </div>

      <B2BBreadcrumbs allBreadcrumbs={allBreadcrumbs} />

      <B2BSection>
        {opportunities.map(opportunity => (
          <Opportunity
            className={classes.servicesPage}
            key={opportunity.id}
            opportunity={opportunity}
            image={opportunity.image}
          />
        ))}
      </B2BSection>
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
export default ServicesPage
