import BrandCases from '_dynamic-pages/project/components/BrandCases/BrandCases'
import { idToImages } from '_dynamic-pages/project/mocks/idToImages'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { isTabletWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import ImageSlider from 'weplay-components/ImageSlider/ImageSlider'
import MediaTabs from 'weplay-components/MediaTabs'
import HeadLine from 'weplay-components/HeadLine'
import Section, { PADDING_Y } from 'weplay-components/_wrappers/Section'
import Image from 'weplay-components/Image'

import { media } from 'components/Services/ServiceSubMenu/services'
import Proposals from 'components/Proposals/Proposals'
import B2BSection from 'components/B2BSection/B2BSection'
import rightsImage from 'components/Services/img/media.jpg'
import MediaBanner from 'components/MediaBanner/MediaBanner'
import AlternateHead from 'components/AlternateHead/AlternateHead'
import HeroSectionBtb from 'components/HeroSectionBtb/HeroSectionBtb'
import B2BBreadcrumbs from 'components/B2BBreadcrumbs/B2BBreadcrumbs'
import ServiceSubMenu from 'components/Services/ServiceSubMenu/ServiceSubMenu'
import proposalsImage from 'components/Proposals/img/pattern.svg'

import ContactUsSection from '_pages/_app//ContactUsModal/ContactUsSection/ContactUsSection'

import { getMediaRightsInitialProps } from 'helpers/getServicesInitialProps'

import classes from './styles.scss'
import { GoogleFormCollapse } from './GoogleFormCollapse/GoogleFormCollapse'
import { videoData, formCollapseData, banner } from './mocks/mediaRightsMocks'

const imageId = 333
const galleryImages = idToImages[imageId]
const CDN_BASE_URL = 'https://static-prod.weplay.tv'
const HERO_IMAGE = `${CDN_BASE_URL}/2020-01-22/1b19b3288ac22e163973c0d89d045070.1B263C-3E658A-236472.jpeg`
const HERO_LOGO = `${CDN_BASE_URL}/2020-01-23/bee6dd114ed8a0b2835da4466481d119.416297-D8EDFA-8CB9E4.png`

const MediaRights = ({
  initialBrandIntegrationNews,
}) => {
  const t = useTranslation()
  const isTabletWidth = useSelector(isTabletWidthSelector)
  const allBreadcrumbs = useMemo(() => [
    {
      name: t('common.breadcrumbs.home'),
      path: '/',
    }, {
      name: t('services.mediaRights.title'),
      path: '/services/media-rights',
    },
  ], [t])
  const alternateLinks = {
    ru: 'https://about.weplay.tv/ru/services/media-rights',
    en: 'https://about.weplay.tv/services/media-rights',
  }

  return (
    <>
      <AlternateHead links={alternateLinks} />

      <HeroSectionBtb
        title={t('services.mediaRights.title')}
        text={t('services.mediaRights.text')}
        buttonText={t('heroSection.button')}
        image={HERO_IMAGE}
        logoImage={HERO_LOGO}
        isLightTheme
      />

      <B2BBreadcrumbs allBreadcrumbs={allBreadcrumbs} />

      <B2BSection>
        <HeadLine
          title={t('services.mediaRights.title')}
          className="u-text-center u-mb-6"
        />
        <div className={classes.block}>
          <p className={classes.text}>{t('mediaRightsPage.description')}</p>
          <Image
            className={classNames(
              'o-img-responsive',
              classes.image,
            )}
            src={rightsImage}
          />
        </div>
      </B2BSection>

      <Section paddingY={PADDING_Y.SM}>
        <ContentContainer>
          <HeadLine
            className="u-mb-6"
            title={t('services.mediaRights.ImageSlider.title')}
          />
          <p className={classes.sliderText}>{t('services.mediaRights.ImageSlider.text')}</p>
        </ContentContainer>
        <ImageSlider images={galleryImages} />
      </Section>

      <Section
        paddingY={PADDING_Y.SM}
        className={classes.proposal}
      >
        <ContentContainer>
          <HeadLine
            title={t('services.mediaRights.proposal')}
            className="u-text-center u-mb-6"
          />
          <Proposals />
        </ContentContainer>
        {!isTabletWidth && (
          <Image
            className={classNames(
              'o-img-responsive',
              classes.imageProposal,
            )}
            src={proposalsImage}
          />
        )}
      </Section>

      <B2BSection>
        <GoogleFormCollapse {...formCollapseData} />
      </B2BSection>

      <Section paddingY={PADDING_Y.SM}>
        <ContentContainer>
          <HeadLine
            title={t('services.mediaRights.howWeMakeIt.title')}
            className="u-text-center u-mb-6"
          />
        </ContentContainer>
        <MediaTabs
          videoData={videoData}
          isViewMoreVideoButtonDisable
        />
      </Section>

      <B2BSection>
        <MediaBanner banner={banner} />
      </B2BSection>

      {Boolean(initialBrandIntegrationNews) && (
        <B2BSection>
          <HeadLine
            className="u-text-center u-mb-6"
            title={t('services.mediaRights.brandIntegration.title')}
          />
          <BrandCases brandIntegrationNews={initialBrandIntegrationNews} />
        </B2BSection>
      )}

      <B2BSection title={t('services.category.subtitle')}>
        <ServiceSubMenu services={media} />
      </B2BSection>

      <div className={classes.sectionGrey}>
        <ContactUsSection />
      </div>
    </>
  )
}

MediaRights.getInitialProps = async ({ ctx, initialLocale }) => getMediaRightsInitialProps({ ctx, initialLocale })

export default MediaRights
