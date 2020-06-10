import React, { useMemo } from 'react'
import Articles from 'components/Articles/Articles'
import FourTiles from 'components/FourTiles/FourTiles'
import AlternateHead from 'components/AlternateHead/AlternateHead'
import HeroSectionBtb from 'components/HeroSectionBtb/HeroSectionBtb'
import B2BSection from 'components/B2BSection/B2BSection'
import Opportunities from '_pages/index/Opportunities/Opportunities'
import image from '_pages/index/img/home.jpg'
import { ESPORTS_BANNERS_IDS } from 'config/banners'
import { useBanner } from 'hooks/useBanner'
import { getServicesInitialProps } from 'helpers/getServicesInitialProps'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import SubscriptionBlock from 'weplay-components/SubscriptionBlock'
import SlickSlider from 'weplay-components/Slider/loadable'
import Link from 'weplay-components/Link'
import Icon from 'weplay-components/Icon'

import Quote from 'weplay-media/components/Quote/Quote'
import BigBanner from 'weplay-media/components/BigBanner'

import classes from './styles.scss'

const locationPage = 'weplay_business_general'
const subscribeFormModifiers = ['lightTheme']
const config = {
  className: 'btbSlider',
  speed: 500,
  arrows: false,
  dots: true,
  easing: 'ease',
}
const MainPage = ({
  initialNewspapersAboutEvents,
  initialNewspapers,
}) => {
  const t = useTranslation()
  const { locale } = useLocale()

  const quotes = useMemo(() => new Array(4)
    .fill()
    .map((_, index) => ({
      body: t(`mainPage.quotes.${index}.body`),
      authorName: t(`mainPage.quotes.${index}.authorName`),
      authorAvatarUrl: t(`mainPage.quotes.${index}.authorAvatarUrl`),
      authorDescription: t(`mainPage.quotes.${index}.authorDescription`),
    })), [t])

  const tabs = useMemo(() => [
    {
      id: 1,
      title: t('services.brandIntegration.title'),
      innerTitle: t('services.brandIntegration.title'),
      innerText: t('brandIntegrationPage.description'),
      buttonText: t('mainPage.moreInfo.button'),
      buttonUrl: '/services/brand-integration',
    }, {
      id: 2,
      title: t('services.mediaRights.title'),
      innerTitle: t('services.mediaRights.title'),
      innerText: t('mediaRightsPage.description'),
      buttonText: t('mainPage.moreInfo.button'),
      buttonUrl: '/services/media-rights',
    }, {
      id: 3,
      title: t('services.eventProduction.title'),
      innerTitle: t('services.eventProduction.title'),
      innerText: t('eventProductionPage.description'),
      buttonText: t('mainPage.moreInfo.button'),
      buttonUrl: '/services/event-production',
    },
  ], [t])

  const bannerId = ESPORTS_BANNERS_IDS?.[locale]
  const banner = useBanner(bannerId)
  const alternateLinks = {
    ru: 'https://about.weplay.tv/ru',
    en: 'https://about.weplay.tv',
  }

  const isNewspapersAboutEventsExists = Boolean(initialNewspapersAboutEvents.length)
  const isNewspapersExists = Boolean(initialNewspapers.length)

  return (
    <>
      <AlternateHead links={alternateLinks} />

      <HeroSectionBtb
        title={t('heroSection.title')}
        text={t('heroSection.text')}
        buttonText={t('heroSection.button')}
        image={image}
      />

      <B2BSection>
        <Opportunities tabs={tabs} />
      </B2BSection>

      {isNewspapersAboutEventsExists && (
        <B2BSection>
          <FourTiles
            tiles={initialNewspapersAboutEvents}
            title={t('common.events.title')}
          />
        </B2BSection>
      )}

      <B2BSection title={t('mainPage.quotes.title')}>
        <div className={classes.quoteWrap}>
          <SlickSlider
            {...config}
          >
            {quotes.map(quote => (
              <Quote
                key={quote.body}
                quote={quote}
              />
            ))}
          </SlickSlider>
        </div>
      </B2BSection>

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

      <B2BSection
        sectionClassName="u-mb-6"
      >
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

MainPage.getInitialProps = async ({ ctx, initialLocale }) => getServicesInitialProps({ ctx, initialLocale })

export default MainPage
