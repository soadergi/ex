import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Image from 'weplay-components/Image'
import Score from 'weplay-events/components/MatchDetails/Score'
import SocialLinks from 'weplay-events/components/TournamentBrackets/Scoreboard/Game/SocialLinks'
import { CS_MAPS } from 'weplay-events/constants/csMaps'
import participantStats from 'weplay-events/customPropTypes/participantStats'

import container from './container'
import styles from './styles.scss'

const ShooterStatsItem = ({
  // required props
  mapHighlights,
  mapStat,
  participantAStats,
  participantBStats,

  // container props
  logSocialClick,
  logMapImageClick,
  logMapNameClick,

  // optional props
  hltvStats,
}) => (
  <div
    className={classNames(
      styles.block,
    )}
  >
    <div
      className={classNames(
        styles.mapInfo,
      )}
    >
      <Score
        firstPart={participantAStats.score.ct}
        secondPart={participantAStats.score.terrorist}
        total={participantAStats.score.total}
        isShooterStats
      />

      <figure
        className={classNames(
          styles.preview,
        )}
      >
        {/* eslint-disable-next-line */}
        <Image
          src={CS_MAPS[mapStat.name]}
          alt=""
          className="o-img-responsive"
          onClick={logMapImageClick}
        />
      </figure>

      <Score
        firstPart={participantBStats.score.ct}
        secondPart={participantBStats.score.terrorist}
        total={participantBStats.score.total}
        isShooterStats
      />
    </div>

    <div
      className={classNames(
        styles.socialLinksWrapper,
      )}
    >
      <span
        className={styles.mapName}
        onClick={logMapNameClick}
      >
        {mapStat.name}
      </span>

      <SocialLinks
        urls={mapHighlights.urls}
        logSocialClick={logSocialClick}
        hltvStats={hltvStats}
        isLinksObject
      />
    </div>

  </div>
)

ShooterStatsItem.propTypes = {
  // required props
  mapStat: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  mapHighlights: PropTypes.shape({
    urls: PropTypes.shape({}),
  }).isRequired,
  participantAStats: participantStats.isRequired,
  participantBStats: participantStats.isRequired,

  // container props
  logSocialClick: PropTypes.func.isRequired,
  logMapNameClick: PropTypes.func.isRequired,
  logMapImageClick: PropTypes.func.isRequired,

  // optional props
  hltvStats: PropTypes.bool,
}

ShooterStatsItem.defaultProps = {
  // optional props
  hltvStats: false,
}

export default container(ShooterStatsItem)
