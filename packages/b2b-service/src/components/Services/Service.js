import React, {
  useMemo,
} from 'react'
import B2BSection from 'components/B2BSection/B2BSection'
import AlternateHead from 'components/AlternateHead/AlternateHead'
import B2BBreadcrumbs from 'components/B2BBreadcrumbs/B2BBreadcrumbs'
import Articles from 'components/Articles/Articles'
import FourTiles from 'components/FourTiles/FourTiles'
import ContactUsSection from '_pages/_app/ContactUsModal/ContactUsSection/ContactUsSection'
import { useBanner } from 'hooks/useBanner'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Icon from 'weplay-components/Icon'
import Link from 'weplay-components/Link'
import Image from 'weplay-components/Image'
import SubscriptionBlock from 'weplay-components/SubscriptionBlock'

import BigBanner from 'weplay-media/components/BigBanner'

import classes from '../../_pages/index/styles.scss'

import { BANNERS_FOR_SERVICES } from './config'

const locationPage = 'weplay_business_general'
const subscribeFormModifiers = ['lightTheme']

const Service = ({
  initialNewspapersAboutEvents,
  initialNewspapers,
  alternateLinks,
  serviceName,
  title,
  text,
  imageUrl,
  seoTitle,
  seoTitleParent,
  seoPath,
  seoPathParent,
}) => {
  const t = useTranslation()
  const { locale } = useLocale()
  const bannerId = BANNERS_FOR_SERVICES?.[serviceName]?.[locale]
  const banner = useBanner(bannerId)

  const allBreadcrumbs = useMemo(() => [
    {
      name: t('common.breadcrumbs.home'),
      path: '/',
    },
    {
      name: seoTitleParent,
      path: seoPathParent,
    },
    {
      name: seoTitle,
      path: seoPath,
    },
  ], [seoPath, seoPathParent, seoTitle, seoTitleParent, t])

  const isNewspapersAboutEventsExists = Boolean(initialNewspapersAboutEvents.length)
  const isNewspapersExists = Boolean(initialNewspapers.length)

  return (
    <>
      <AlternateHead links={alternateLinks} />

      <B2BBreadcrumbs allBreadcrumbs={allBreadcrumbs} />

      <B2BSection>
        <div className={classes.block}>
          <h1>{title}</h1>
        </div>
        <figure className={classes.imgBlock}>
          <Image
            src={imageUrl}
            alt={imageUrl}
            className={classes.image}
          />
        </figure>
        <div className={classes.block}>
          <h2>{title}</h2>
          <p className={classes.bigText}>
            {text}
          </p>
        </div>
      </B2BSection>

      <div className={classes.sectionGrey}>
        <ContactUsSection />
      </div>

      {isNewspapersAboutEventsExists && (
        <B2BSection>
          <FourTiles
            tiles={initialNewspapersAboutEvents}
            title={t('common.events.title')}
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
        <B2BSection className="u-mb-6">
          <BigBanner banner={banner} />
        </B2BSection>
      )}
    </>
  )
}

export default Service
