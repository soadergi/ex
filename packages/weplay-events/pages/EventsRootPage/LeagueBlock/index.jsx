import React from 'react'
import PropTypes from 'prop-types'
import Link from 'weplay-components/Link'
import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'
import Icon from 'weplay-components/Icon'
import GradientLink from 'weplay-components/GradientLink'
import Image from 'weplay-components/Image'
import prevLeagueLogo from 'weplay-events/pages/ForgeOfMastersLeaguePage/img/logo.png'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import TeaserModal from 'weplay-events/components/TeaserModal'

import background from './img/Laegue-bg.jpg'
import NextLeague from './NextLeague'
import PrevLeague from './PrevLeague'
import LeagueTeaser from './LeagueTeaser'
import container from './container'
import styles from './styles.scss'
import { TEASER, HEADER_LINK } from './constants'
import teaser2Img from './img/FoM1.jpg'
import teaser1Img from './img/FoM2.jpg'

const LeagueBlock = ({
  // required props
  // container props
  i18nTexts,
  showTeaserModal,
  hideTeaserModal,
  videoUrl,
  // optional props
}) => (
  <div className={styles.block}>
    <Image
      className={styles.backgroundUrl}
      src={background}
      alt=""
    />
    <ContentContainer>
      <Image
        className={styles.curLeagueLogo}
        src={prevLeagueLogo}
        alt="previousLeagueLogo"
      />
      <div className={styles.container}>
        <div className={styles.curLeague}>
          <h2 className={styles.title}>{i18nTexts.events.eventsRootPage.leagueBlock.mainTitle}</h2>
          <p className={styles.description}>
            {i18nTexts.events.eventsRootPage.leagueBlock.description}
          </p>
          <Link
            className={styles.link}
            to={pathWithParamsByRoute(NAMES.FORGE_OF_MASTERS_LEAGUE)}
          >
            {i18nTexts.events.eventsRootPage.leagueBlock.previous.button}
            <Icon
              iconName="arrow-link"
              size="small"
              className="u-mr-0 u-ml-1"
            />
          </Link>
          <div className={styles.teaserWrap}>
            <GradientLink
              to={HEADER_LINK}
              text={i18nTexts.events.eventsRootPage.leagueBlock.previous.teasersLink}
            />

            <div className={styles.curVideos}>
              <LeagueTeaser
                videoUrl={TEASER.season_1_first.url}
                duration={TEASER.season_1_first.duration}
                text={i18nTexts.events.eventsRootPage.leagueBlock.firstTeaserTitle}
                showTeaserModal={showTeaserModal}
                previewImg={teaser1Img}
              />
              <LeagueTeaser
                videoUrl={TEASER.season_1_second.url}
                duration={TEASER.season_1_second.duration}
                text={i18nTexts.events.eventsRootPage.leagueBlock.secondTeaserTitle}
                showTeaserModal={showTeaserModal}
                previewImg={teaser2Img}
              />
            </div>
          </div>
        </div>
        <PrevLeague />
        <NextLeague
          showTeaserModal={showTeaserModal}
          videoUrl={videoUrl}
        />
      </div>
    </ContentContainer>

    {Boolean(videoUrl) && (
      <TeaserModal
        onCloseModal={hideTeaserModal}
        videoUrl={videoUrl}
      />
    )}
  </div>

)

LeagueBlock.propTypes = {
  // required props
  // container props
  i18nTexts: PropTypes.shape({}).isRequired,
  videoUrl: PropTypes.string.isRequired,
  showTeaserModal: PropTypes.func.isRequired,
  hideTeaserModal: PropTypes.func.isRequired,
  // optional props
}

LeagueBlock.defaultProps = {
  // optional props
}

export default container(LeagueBlock)
