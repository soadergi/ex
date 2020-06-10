import React from 'react'
import PropTypes from 'prop-types'

import socialLinkPropType from 'weplay-core/customPropTypes/socialLinkPropType'
import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'
import { seoScript } from 'weplay-core/helpers/seoScript'
import { NAMES } from 'weplay-core/routes'

import HrefLangLink from 'weplay-components/HrefLangLink'
import LazyDiv from 'weplay-components/LazyDiv'
import PageHelmet from 'weplay-components/PageHelmet'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import Section, { BORDER, BORDER_COLOR, PADDING_Y } from 'weplay-components/_wrappers/Section'
import FeatureSection from 'weplay-components/_wrappers/FeatureSection'
import HeadLine from 'weplay-components/HeadLine'
import GradientLink from 'weplay-components/GradientLink'
import NewsSection from 'weplay-components/NewsSection'
import SimpleSubscribeForm from 'weplay-components/SubscribeForms/SimpleSubscribeForm'
import SocialList from 'weplay-components/SocialList'
import MediaTabs from 'weplay-components/MediaTabs'
import Separator from 'weplay-components/Separator/Separator'

import MainPageTournamentsListing from './MainPageTournamentsListing/loadable'
import HeroSection from './HeroSection'
import MainCarousel from './MainCarousel'
import SocialPostList from './SocialPostList'
import HeadlineWrapper from './HeadLineWrapper'
import Events from './Events'
import container from './container'
import styles from './styles.scss'

const socialLinksModificationsVideos = ['videos']
const SHOW_TOURNAMENTS_NUMBER = 3
const RootPage = ({
  // required props
  // container props
  homepageSlider,
  homepageTournaments,
  homepageYoutube,
  homepageVideoSocialLinks,
  homepageNewsBlock,
  homepageSocialPosts,
  homepageSocialLinks,
  homepageSubscription,
  subscriptionBlock,
  sectionBackground,
  videoAnchorRef,
  handleScrollToVideo,
  ogImage,
}) => (
  <div
    className={styles.block}
    data-qa-id={dataQaIds.pages[NAMES.ROOT].container}
    {...getAnalyticsAttributes({
      position: 'Content',
      category: 'Main Page',
    })}
  >
    <PageHelmet
      seoInfo={seoScript}
      ogImage={ogImage}
    />
    <HrefLangLink pathname="/" />
    <HeroSection>
      <MainCarousel sliderData={homepageSlider} />
      <Events />
    </HeroSection>
    <MainPageTournamentsListing
      amount={SHOW_TOURNAMENTS_NUMBER}
      homepageTournaments={homepageTournaments}
    />
    <Section
      hasBorder={BORDER.BOTTOM}
      borderColor={BORDER_COLOR.DARK}
      className={styles.hasBackground}
      style={sectionBackground}
    >
      <ContentContainer>
        <HeadlineWrapper
          linkUrl={homepageYoutube.linkUrl}
          linkText={homepageYoutube.linkText}
          title={homepageYoutube.title}
          text={homepageYoutube.description}
        />
      </ContentContainer>

      <div ref={videoAnchorRef}>
        <MediaTabs
          videoData={homepageYoutube}
          handleScrollToVideo={handleScrollToVideo}
        />
      </div>

      <ContentContainer>
        <Separator size="large" />
        <HeadLine
          size="h3"
          title={homepageVideoSocialLinks.title}
        />
        <SocialList
          links={homepageVideoSocialLinks.socialLinks}
          modifiers={socialLinksModificationsVideos}
        />
      </ContentContainer>
    </Section>

    <Section
      hasBorder={BORDER.BOTTOM}
      borderColor={BORDER_COLOR.DARK}
    >
      <ContentContainer>
        <GradientLink
          to={homepageNewsBlock.linkUrl}
          text={homepageNewsBlock.linkText}
        />
        <NewsSection sourcesList={homepageNewsBlock.news} />
      </ContentContainer>
    </Section>

    <Section
      hasBorder={BORDER.BOTTOM}
      borderColor={BORDER_COLOR.DARK}
      paddingY={PADDING_Y.NONE}
    >
      <ContentContainer>
        <div className={styles.postsSection}>
          <LazyDiv>
            <SocialPostList postLinks={homepageSocialPosts} />
          </LazyDiv>
          <div className={styles.socialLinksWrap}>
            <HeadLine
              title={homepageSocialLinks.title}
              text={homepageSocialLinks.description}
            />
            <SocialList links={homepageSocialLinks.socialLinks} />
          </div>
        </div>
      </ContentContainer>
    </Section>

    <Section
      hasBorder={BORDER.BOTTOM}
      borderColor={BORDER_COLOR.DARK}
    >
      <FeatureSection>
        <HeadLine
          title={homepageSubscription.title}
          text={homepageSubscription.description}
        />
        <SimpleSubscribeForm subscriptionBlock={subscriptionBlock} />
      </FeatureSection>
    </Section>
  </div>
)

RootPage.propTypes = {
  // required props
  // container props
  sectionBackground: PropTypes.shape({}).isRequired,
  homepageSlider: PropTypes.shape({}).isRequired,
  homepageTournaments: PropTypes.shape({
    linkUrl: PropTypes.string,
    linkText: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    secondaryLinkUrl: PropTypes.string,
    secondaryLinkText: PropTypes.string,
  }).isRequired,
  homepageYoutube: PropTypes.shape({
    linkUrl: PropTypes.string,
    linkText: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  homepageVideoSocialLinks: PropTypes.shape({
    title: PropTypes.string,
    socialLinks: PropTypes.arrayOf(socialLinkPropType),
  }).isRequired,
  homepageNewsBlock: PropTypes.shape({
    linkUrl: PropTypes.string,
    linkText: PropTypes.string,
    news: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  homepageSocialPosts: PropTypes.arrayOf(PropTypes.string).isRequired,
  homepageSocialLinks: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    socialLinks: PropTypes.arrayOf(socialLinkPropType),
  }.string).isRequired,
  homepageSubscription: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }.string).isRequired,
  // optional props
  subscriptionBlock: PropTypes.shape({}),
  videoAnchorRef: PropTypes.func.isRequired,
  handleScrollToVideo: PropTypes.func.isRequired,
  ogImage: PropTypes.string.isRequired,
}

RootPage.defaultProps = {
  // optional props
  subscriptionBlock: null,
}

export default container(RootPage)
