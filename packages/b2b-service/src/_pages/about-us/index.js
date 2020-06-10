import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

import MediaContent from 'weplay-components/MediaContent'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import BackgroundImg from 'weplay-components/BackgroundImg'
import Headline from 'weplay-components/HeadLine'
import Section, { PADDING_Y } from 'weplay-components/_wrappers/Section'
import Link from 'weplay-components/Link'
import Icon from 'weplay-components/Icon'

import Leaders from 'components/Leaders/Leaders'
import HeroSectionBtb from 'components/HeroSectionBtb/HeroSectionBtb'
import Facts from 'components/Facts/Facts'
import { facts } from 'components/Facts/factsList'
import { vectorsWeplay, vectorsWork } from 'components/Vectors/vectorsList'
import Vectors from 'components/Vectors/Vectors'
import B2BBreadcrumbs from 'components/B2BBreadcrumbs/B2BBreadcrumbs'
import AlternateHead from 'components/AlternateHead/AlternateHead'

import imageUrl from '_pages/index/img/home.jpg'
import background from '_pages/index/img/techiia.svg'
import Opportunity from '_pages/index/Opportunities/Opportunity/Opportunity'

import classes from './styles.scss'

const aboutUsImage = 'https://static-prod.weplay.tv/2019-10-29/0ff7d4059999dd0629c6a40d4f6e34df.jpeg'

const teamPagePath = '/team'

const AboutUsPage = ({
  activeVideoTitle,
}) => {
  const t = useTranslation()

  const isMobileWidth = useSelector(isMobileWidthSelector)

  const alternateLinks = {
    ru: 'https://about.weplay.tv/ru/about-us',
    en: 'https://about.weplay.tv/about-us',
  }

  const allBreadcrumbs = useMemo(() => [
    {
      name: t('common.breadcrumbs.home'),
      path: '/',
    },
    {
      name: t('aboutUsPage.seo.title'),
      path: '/about-us',
    },
  ], [t])

  const opportunities = useMemo(() => [
    {
      id: 1,
      innerTitle: t('aboutUsPage.opportunities.title'),
      innerText: t('aboutUsPage.opportunities.description'),
      buttonText: t('aboutUsPage.opportunities.button'),
      buttonUrl: 'https://techiia.breezy.hr/',
      image: aboutUsImage,
    },
  ], [t])

  return (
    <>
      <AlternateHead links={alternateLinks} />

      <div className={classes.heroWrap}>
        <HeroSectionBtb
          title={t('aboutUs.heroSection.title')}
          text={t('aboutUs.heroSection.text')}
          buttonText={t('heroSection.button')}
          image={imageUrl}
        />
      </div>

      <B2BBreadcrumbs allBreadcrumbs={allBreadcrumbs} />

      <Vectors
        title={t('aboutUsPage.vectors.title')}
        vectors={vectorsWeplay}
      />

      <Section
        paddingY={PADDING_Y.SM}
      >
        <ContentContainer>
          <Headline
            className="u-text-center"
            title={t('aboutUsPage.video.title')}
          />
          <p className={classes.techiiaText}>{t('aboutUsPage.video.text')}</p>
          <MediaContent
            title={activeVideoTitle}
            url="https://youtu.be/kWdnC-dYHVY"
            type="video"
          />
        </ContentContainer>
      </Section>

      <Section
        paddingY={PADDING_Y.SM}
      >
        <Facts
          title={t('aboutUsPage.facts.title')}
          facts={facts}
        />
      </Section>

      <Vectors
        title={t('aboutUsPage.vectorsWork.title')}
        vectors={vectorsWork}
      />

      <Leaders>
        <div className={classes.btnWrap}>
          <Link
            to={teamPagePath}
            className={classes.link}
          >
            {t('aboutUsPage.leaders.button.text')}
            <Icon
              iconName="arrow-link"
              className="u-ml-1"
            />
          </Link>
        </div>
      </Leaders>

      <Section
        paddingY={PADDING_Y.SM}
      >
        <ContentContainer>
          <Headline
            className={classes.techiiaTitle}
            title={t('aboutUsPage.techiia.title')}
          />
          <div className={classes.techiiaWrap}>
            <p className={classes.techiiaText}>{t('aboutUsPage.techiia.text')}</p>
            {!isMobileWidth && (
              <BackgroundImg
                className={classes.techiiaBackground}
                src={background}
                alt={background}
              />
            )}
          </div>
        </ContentContainer>
      </Section>

      <Section
        paddingY={PADDING_Y.SM}
        className="u-mb-6"
      >
        <ContentContainer>
          {opportunities.map(opportunity => (
            <Opportunity
              className={classes.aboutUsPage}
              key={opportunity.id}
              opportunity={opportunity}
              image={opportunity.image}
            />
          ))}
        </ContentContainer>
      </Section>
    </>
  )
}
export default AboutUsPage
