import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'

import PageHelmet from 'weplay-components/PageHelmet'
import HrefLangLink from 'weplay-components/HrefLangLink'
import SeoBlock from 'weplay-components/SeoBlock/SeoBlock'
import HeadLine from 'weplay-components/HeadLine'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import FeatureSection from 'weplay-components/_wrappers/FeatureSection'
import GradientLink from 'weplay-components/GradientLink'
import NewsSection from 'weplay-components/NewsSection'
import SubscriptionBlock from 'weplay-components/SubscriptionBlock'
// import Image from 'weplay-components/Image'
import Section from 'weplay-components/_wrappers/Section'
// import ImageSlider from 'weplay-components/ImageSlider/ImageSlider'

// import SubscribeBlock from 'weplay-events/components/SubscribeBlock'
import EventsCard from 'weplay-events/components/EventsCard'
import FutureEventsSection from 'weplay-events/components/FutureEventsSection'
// import WidgetBlock from 'weplay-events/components/WidgetBlock'
import eventCardPropType from 'weplay-events/customPropTypes/eventCardPropType'
import TalentsBlock from 'weplay-events/components/TalentsBlock'

import ogImage from './img/ogImage.jpg'
// import LeagueBlock from './LeagueBlock'
// import background from './img/USA_flag.jpg'
import MainCarousel from './MainCarousel'
import container from './container'
import styles from './styles.scss'
// import { CS_GO_SUBSCRIPTION_ID } from './constants'

const EventsRootPage = ({
  // required props

  // container props
  // eventRootPageGalleryImages,
  eventRootPageNewsSourceList,
  eventsRootPageArchiveEvents,
  // eventsRootPageFutureEvents,
  hreflangUrl,
  talents,
  backgroundImg,

  // optional props
}) => {
  const t = useTranslation()

  return (
    <div
      className={styles.block}
      data-event-category="Events Page"
      data-qa-id={dataQaIds.pages[NAMES.EVENTS_ROOT].container}
    >
      <PageHelmet
        ogImage={ogImage}
        width={600}
        height={315}
      />

      <HrefLangLink pathname={hreflangUrl} />

      <MainCarousel />

      {/*
        <>
          <WidgetBlock />

          <Section>
            <ContentContainer>
              <HeadLine
                title={t('events.eventsRootPage.futureEventsBlock.title')}
                text={t('events.eventsRootPage.futureEventsBlock.description')}
                className={styles.headline}
              />
            </ContentContainer>
            <div data-event-position="EventSection1">
              <FutureEventsSection>
                {eventsRootPageFutureEvents.map(event => (
                  <EventsCard
                    key={event.id}
                    event={event}
                    isTournamentActive
                  />
                ))}
              </FutureEventsSection>
            </div>
          </Section>

          <LeagueBlock />

          <div className={styles.banner}>
            <ContentContainer>
              <div className={styles.wrap}>
                <SubscribeBlock
                  title={t('events.eventsRootPage.leagueBlock.subscribeBottom.title')}
                  titleColor={t('events.eventsRootPage.leagueBlock.subscribeBottom.titleColor')}
                  text={t('events.eventsRootPage.leagueBlock.subscribeBottom.text')}
                  subscriptionScopeId={CS_GO_SUBSCRIPTION_ID}
                />
              </div>
            </ContentContainer>
            <Image
              className={styles.backgroundUrl}
              src={background}
              alt=""
            />
          </div>
        </>
      */}

      <Section>
        <ContentContainer>
          <GradientLink
            to={pathWithParamsByRoute(NAMES.MEDIA)}
            text={t('events.eventsRootPage.newsSection.gradientLink')}
          />
          <NewsSection
            sourcesList={eventRootPageNewsSourceList}
          />
        </ContentContainer>
      </Section>

      <TalentsBlock
        className="u-py-6 u-py-sm-12 u-py-md-9 u-py-lg-16"
        title={t('events.eventsRootPage.talents.title')}
        description={t('events.eventsRootPage.talents.description')}
        talents={talents}
        background={backgroundImg}
      />

      <Section className="u-pb-0">
        <FeatureSection>
          {/* TODO: @Ivan replace these texts with texts from backend */}
          <HeadLine
            title={t('events.eventsRootPage.featureSection.headLine.title')}
            text={t('events.eventsRootPage.featureSection.headLine.text')}
          />
          <SubscriptionBlock
            isSimple
          />
        </FeatureSection>
      </Section>

      <Section>
        <ContentContainer>
          <HeadLine
            className={styles.headline}
            title={t('events.eventsRootPage.archiveEventsBlock.title')}
            text={t('events.eventsRootPage.archiveEventsBlock.description')}
          />
        </ContentContainer>
        <div data-event-position="EventSection2">
          <FutureEventsSection>
            {eventsRootPageArchiveEvents.map(event => (
              <EventsCard
                key={event.id}
                event={event}
              />
            ))}
          </FutureEventsSection>
        </div>
      </Section>

      {/* <ImageSlider images={eventRootPageGalleryImages} /> */}

      <Section>
        <ContentContainer>
          <SeoBlock
            title={t('events.eventsRootPage.seoBlock.title')}
            content={t('events.eventsRootPage.seoBlock.content')}
          />
        </ContentContainer>
      </Section>
    </div>
  )
}

EventsRootPage.propTypes = {
  // required props

  // container props
  // eventRootPageGalleryImages: PropTypes.arrayOf(PropTypes.string).isRequired,
  eventRootPageNewsSourceList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  eventsRootPageArchiveEvents: PropTypes.arrayOf(eventCardPropType).isRequired,
  // eventsRootPageFutureEvents: PropTypes.arrayOf(eventCardPropType).isRequired,
  hreflangUrl: PropTypes.string.isRequired,
  talents: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  // optional props
  backgroundImg: PropTypes.string,
}

EventsRootPage.defaultProps = {
  // optional props
  backgroundImg: '',
}

export default container(EventsRootPage)
