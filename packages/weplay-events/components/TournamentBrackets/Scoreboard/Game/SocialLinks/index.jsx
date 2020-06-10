import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.scss'
import container from './container'
import SocialLink from './SocialLink'

const SocialLinks = ({
  // required props
  logSocialClick,
  isLinksObject,

  // props from container
  i18nTexts,
  currentLanguage,

  // optional props
  urls,
  className,
  hltvStats,
  dotabuffStats,
}) => (
  <div className={classNames(
    styles.block,
    className,
  )}
  >
    <ul className={styles.list}>

      <SocialLink
        iconName="twitch"
        url={isLinksObject ? urls.twitchClips[currentLanguage] : urls.twitchClips}
        linkClassName="twi"
        logSocialClick={logSocialClick}
      />

      {hltvStats && (
        <SocialLink
          iconName="hltv"
          url={isLinksObject ? urls.stats[currentLanguage] : urls.stats}
          linkClassName="hltv"
          logSocialClick={logSocialClick}
        />
      )}

      {dotabuffStats && (
        <SocialLink
          iconName="dotabuff"
          url={isLinksObject ? urls.stats[currentLanguage] : urls.stats}
          linkClassName="dotabuff"
          logSocialClick={logSocialClick}
        />
      )}

      <SocialLink
        iconName="youtube"
        url={isLinksObject ? urls.highlights[currentLanguage] : urls.highlights}
        linkClassName="yt"
        logSocialClick={logSocialClick}
      />
      <SocialLink
        iconName="newspaper"
        url={isLinksObject ? urls.news[currentLanguage] : urls.news}
        linkClassName="news"
        logSocialClick={logSocialClick}
      />
    </ul>

    {false && (
      <button
        type="button"
        className={classNames(
          styles.link,
        )}
      >
        {i18nTexts.artifact.player.subscribeLink}
      </button>
    )}
  </div>
)

SocialLinks.propTypes = {
  // required props
  logSocialClick: PropTypes.func.isRequired,
  urls: PropTypes.shape({}).isRequired,

  // props from container
  i18nTexts: PropTypes.shape({}).isRequired,
  currentLanguage: PropTypes.string.isRequired,

  // optional props
  className: PropTypes.string,
  hltvStats: PropTypes.bool,
  dotabuffStats: PropTypes.bool,
  isLinksObject: PropTypes.bool,
}

SocialLinks.defaultProps = {
  // optional props
  className: '',
  hltvStats: false,
  dotabuffStats: false,
  isLinksObject: false,
}

export default container(SocialLinks)
