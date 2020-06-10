import React, { useMemo } from 'react'
import AlternateHead from 'components/AlternateHead/AlternateHead'
import HeroSectionBtb from 'components/HeroSectionBtb/HeroSectionBtb'
import B2BBreadcrumbs from 'components/B2BBreadcrumbs/B2BBreadcrumbs'
import B2BSection from 'components/B2BSection/B2BSection'
import Articles from 'components/Articles/Articles'
import FourTiles from 'components/FourTiles/FourTiles'
import ContactUsSection from '_pages/_app/ContactUsModal/ContactUsSection/ContactUsSection'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Link from 'weplay-components/Link'
import Icon from 'weplay-components/Icon'

import classes from '../../_pages/index/styles.scss'

import ServiceSubMenu from './ServiceSubMenu/ServiceSubMenu'

const ServiceCategory = ({
  initialNewspapersAboutEvents,
  initialNewspapers,
  alternateLinks,
  title,
  text,
  imageUrl,
  seoTitle,
  seoPath,
  services,
}) => {
  const t = useTranslation()

  const allBreadcrumbs = useMemo(() => [
    {
      name: t('common.breadcrumbs.home'),
      path: '/',
    },
    {
      name: seoTitle,
      path: seoPath,
    },
  ], [seoPath, seoTitle, t])

  const isNewspapersAboutEventsExists = Boolean(initialNewspapersAboutEvents.length)
  const isNewspapersExists = Boolean(initialNewspapers.length)

  return (
    <>
      <AlternateHead links={alternateLinks} />

      <div className={classes.heroWrap}>
        <HeroSectionBtb
          title={title}
          text={text}
          buttonText={t('heroSection.button')}
          image={imageUrl}
        />
      </div>

      <B2BBreadcrumbs allBreadcrumbs={allBreadcrumbs} />

      {isNewspapersAboutEventsExists && (
        <B2BSection title={t('services.category.subtitle')}>
          <ServiceSubMenu services={services} />

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

      <div className={classes.sectionGrey}>
        <ContactUsSection />
      </div>
    </>
  )
}
export default ServiceCategory
