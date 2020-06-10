import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

import BackgroundFullWidth from 'weplay-components/BackgroundFullWidth'
import Section, { PADDING_Y } from 'weplay-components/_wrappers/Section'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'

import { offices, emails } from 'components/ContactsList/contacts'
import AlternateHead from 'components/AlternateHead/AlternateHead'
import B2BBreadcrumbs from 'components/B2BBreadcrumbs/B2BBreadcrumbs'
import ContactsList from 'components/ContactsList/ContactsList'

import background from '_pages/index/img/WorldMap.svg'
import ContactUsSection from '_pages/_app/ContactUsModal/ContactUsSection/ContactUsSection'

import classes from './styles.scss'

const ContactUsPage = () => {
  const t = useTranslation()
  const isMobileWidth = useSelector(isMobileWidthSelector)
  const alternateLinks = {
    ru: 'https://about.weplay.tv/ru/contacts',
    en: 'https://about.weplay.tv/contacts',
  }
  const allBreadcrumbs = useMemo(() => [
    {
      name: t('common.breadcrumbs.home'),
      path: '/',
    },
    {
      name: t('contactsPage.seo.breadcrumbs.contacts'),
      path: '/contacts',
    },
  ], [t])
  return (
    <>
      <AlternateHead links={alternateLinks} />

      {!isMobileWidth && (
        <div className={classes.background}>
          <BackgroundFullWidth
            src={background}
            alt={background}
          />
        </div>

      )}

      <Section
        paddingY={PADDING_Y.SM}
      >
        <B2BBreadcrumbs allBreadcrumbs={allBreadcrumbs} />
        <ContentContainer>
          <div className={classes.formBlock}>
            <div className={classes.contactDescriptionWrap}>
              <h1>{t('contactPage.title')}</h1>
              <p className={classes.contactDescription}>{t('contactPage.text')}</p>
            </div>
            <div className={classes.formWrap}>
              <ContactUsSection />
            </div>
          </div>
        </ContentContainer>
      </Section>
      <ContentContainer>
        <div className={classes.officesBlock}>
          <h2 className="c-h1 u-mb-8 u-text-center">{t('contactPage.ourOffices.title')}</h2>
          <div className={classes.officesWrap}>
            <ContactsList
              list={offices}
            />
          </div>
        </div>

        <div className={classes.emailsBlock}>
          <ContactsList
            list={emails}
          />
        </div>
      </ContentContainer>
    </>
  )
}

export default ContactUsPage
