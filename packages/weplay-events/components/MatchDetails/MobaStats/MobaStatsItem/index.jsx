import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from 'weplay-components/Icon'
import SocialLinks from 'weplay-events/components/TournamentBrackets/Scoreboard/Game/SocialLinks'
import HeroesPick from 'weplay-events/components/MatchDetails/MobaStats/HeroesPick'

import styles from '../styles.scss'

import container from './container'

const MobaStatsItem = ({
  // required props
  mapHighlights,
  matchDetails,
  logSocialClick,
  isRadiantLeft,

  // container props
  radiantHeroes,
  direHeroes,
  duration,
  isWinIconRight,

  // optional props
  dotabuffStats,
}) => matchDetails && (
  <div
    className={classNames(
      styles.block,
    )}
  >
    <div
      className={classNames(
        styles.previewHeroes,
      )}
    >

      {radiantHeroes && (
        <HeroesPick
          heroes={isRadiantLeft ? radiantHeroes : direHeroes}
        />
      )}

      <div
        className={classNames(
          styles.matchTime,
        )}
      >
        <Icon
          className={classNames(
            styles.winnerLeft,
            {
              [styles.winnerRight]: isWinIconRight,
            },
          )}
          iconName="check"
        />
        <span>
          {duration}
        </span>
      </div>

      {direHeroes && (
        <HeroesPick
          heroes={isRadiantLeft ? direHeroes : radiantHeroes}
        />
      )}

    </div>

    <div
      className={classNames(
        styles.socialLinksWrapper,
      )}
    >
      <SocialLinks
        urls={mapHighlights.urls}
        logSocialClick={logSocialClick}
        dotabuffStats={dotabuffStats}
        isLinksObject
      />
    </div>
  </div>
)

MobaStatsItem.propTypes = {
  // required props
  mapHighlights: PropTypes.shape({}).isRequired,
  matchDetails: PropTypes.shape({}).isRequired,
  logSocialClick: PropTypes.func.isRequired,
  isRadiantLeft: PropTypes.bool.isRequired,

  // container props
  radiantHeroes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  direHeroes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  duration: PropTypes.string.isRequired,
  isWinIconRight: PropTypes.bool.isRequired,

  // optional props
  dotabuffStats: PropTypes.bool,
}

MobaStatsItem.defaultProps = {
  // optional props
  dotabuffStats: false,
}

export default container(MobaStatsItem)
