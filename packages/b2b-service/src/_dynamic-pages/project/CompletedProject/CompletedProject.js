import React, { useMemo } from 'react'

import BrandCases from '_dynamic-pages/project/components/BrandCases/BrandCases'
import Infographics from '_dynamic-pages/project/components/Infographics/Infographics'
import ProjectStats from '_dynamic-pages/project/components/ProjectStats/ProjectStats'
import SocialReviews from '_dynamic-pages/project/components/SocialReviews/SocialReviews'
import { getSocialReviewsById } from '_dynamic-pages/project/mocks/getSocialReviewsById'
import { getOpportunityById } from '_dynamic-pages/project/mocks/getOpportunityById'
import { idToImages } from '_dynamic-pages/project/mocks/idToImages'
import { idToMainImage } from '_dynamic-pages/project/mocks/idToMainImage'
import { idToStats } from '_dynamic-pages/project/mocks/idToStats'
import { idToOpportunity } from '_dynamic-pages/project/mocks/idToOpportunity'
import { idToTranslationKey } from '_dynamic-pages/project/mocks/idToTranslationKey'
import { idToInfographics } from '_dynamic-pages/project/mocks/idToInfographics'
import { idToBanner } from '_dynamic-pages/project/mocks/idToBanner'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import Section, { PADDING_Y } from 'weplay-components/_wrappers/Section'
import HeadLine from 'weplay-components/HeadLine'
import Icon from 'weplay-components/Icon'
import ImageSlider from 'weplay-components/ImageSlider/ImageSlider'
import Link from 'weplay-components/Link'
import Partners from 'weplay-components/LegacyPartners'
import SubscriptionBlock from 'weplay-components/SubscriptionBlock'

import BigBanner from 'weplay-media/components/BigBanner'

import HeroSectionBtb from 'components/HeroSectionBtb/HeroSectionBtb'
import Articles from 'components/Articles/Articles'
import B2BBreadcrumbs from 'components/B2BBreadcrumbs/B2BBreadcrumbs'
import B2BSection from 'components/B2BSection/B2BSection'
import SeoTags from 'components/SeoTags/SeoTags'

import { useBanner } from 'hooks/useBanner'

import Opportunity from '_pages/index/Opportunities/Opportunity/Opportunity'

import classes from './CompletedProject.scss'

const locationPage = 'weplay_business_general'
const subscribeFormModifiers = ['lightTheme']
const MINOR_ID = 45
const projectsWithDarkBackgound = [MINOR_ID]

const CompletedProject = ({
  initialNewspapers,
  initialBrandIntegrationNews,
  project = {},
  id,
  router,
}) => {
  const t = useTranslation()
  const { locale } = useLocale()
  const bannerId = idToBanner?.[id]?.[locale]
  const banner = useBanner(bannerId)

  const { opportunity } = useMemo(() => getOpportunityById({
    id,
    t,
  }), [id, t])

  const socialReviews = useMemo(() => getSocialReviewsById({
    id,
    t,
  }), [id, t])

  const galleryImages = idToImages[id]
  const translationKey = idToTranslationKey[id]

  const allBreadcrumbs = useMemo(() => [
    {
      name: t('common.breadcrumbs.home'),
      path: '/',
    },
    {
      name: t('projectsPage.seo.breadcrumbs.projects'),
      path: '/projects',
    },
    {
      name: t(`projectPage.${translationKey}.heroSection.title`),
      path: router.asPath,
    },
  ], [router.asPath, t, translationKey])

  const isBrandIntegrationNewsExists = Boolean(initialBrandIntegrationNews.length)
  const isNewspapersExists = Boolean(initialNewspapers.length)
  const isPartnersExists = Boolean(project?.partners?.length)

  return (
    <>
      <SeoTags
        title={t(`projectPage.${translationKey}.seo.title`)}
        description={t(`projectPage.${translationKey}.seo.description`)}
      />
      <div className={classes.heroWrap}>
        <HeroSectionBtb
          title={t(`projectPage.${translationKey}.heroSection.title`)}
          image={idToMainImage[id] || project.attributes.backgroundUrl}
          isLightTheme={projectsWithDarkBackgound.includes(id)}
        />
        <ProjectStats stats={idToStats[id]} />
      </div>

      <B2BBreadcrumbs allBreadcrumbs={allBreadcrumbs} />

      <B2BSection>
        <Opportunity
          className={classes.projectPage}
          opportunity={opportunity}
          image={idToOpportunity[id]}
        />
      </B2BSection>

      <Section
        paddingY={PADDING_Y.SM}
      >
        <ContentContainer>
          <HeadLine
            title={t('projectPage.common.ImageSlider.title')}
          />
          <p className={classes.text}>{t(`projectPage.${translationKey}.ImageSlider.text`)}</p>
        </ContentContainer>
        <ImageSlider images={galleryImages} />
      </Section>

      <B2BSection>
        <SocialReviews
          socialReviews={socialReviews}
        />
      </B2BSection>

      {isBrandIntegrationNewsExists && (
        <B2BSection>
          <HeadLine
            className="u-text-center"
            title={t('projectPage.common.brandIntegration.title')}
          />
          <BrandCases
            brandIntegrationNews={initialBrandIntegrationNews}
          />
        </B2BSection>
      )}

      <B2BSection>
        <Infographics
          title={t(`projectPage.${translationKey}.infographics.title`)}
          images={idToInfographics[id][locale]}
        />
      </B2BSection>

      {isPartnersExists && (
        <B2BSection>
          <Partners
            className={classes.partners}
            partners={project.partners || []}
            partnersTitle={t('projectPage.common.partners.title')}
          />
        </B2BSection>
      )}

      {isNewspapersExists && (
        <B2BSection>
          <Articles
            newspapers={initialNewspapers}
            button={(
              <div className={classes.buttonWrap}>
                <Link
                  to="/blog"
                  className={classes.button}
                >
                  {t('common.news.button.text')}
                  <Icon
                    size="small"
                    iconName="arrow-link"
                    className="u-ml-1"
                  />
                </Link>
              </div>
              )}
          />
        </B2BSection>
      )}

      <B2BSection>
        <SubscriptionBlock
          modifiers={subscribeFormModifiers}
          pageName={locationPage}
        />
      </B2BSection>

      {banner && (
        <B2BSection
          sectionClassName="u-mb-6"
        >
          <BigBanner banner={banner} />
        </B2BSection>
      )}
    </>
  )
}

export default CompletedProject
