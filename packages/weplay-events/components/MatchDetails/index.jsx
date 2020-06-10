import React from 'react'
import classNames from 'classnames'
import { Scrollbars } from 'react-custom-scrollbars'
import PropTypes from 'prop-types'

import Icon from 'weplay-components/Icon'

import Header from 'weplay-events/components/MatchDetails/Header'

import MobaStats from './MobaStats'
import ShooterStats from './ShooterStats'
import styles from './styles.scss'
import container from './container'

const MatchDetails = ({
  matches,
  participantA,
  participantB,
  tournamentDiscipline,
  mapHighlights,
  onClose,
  matchId,
}) => (
  <div
    className={classNames(
      styles.block,
    )}
  >
    <span
      onClick={onClose}
    >
      <Icon
        className={styles.close}
        iconName="close"
      />
    </span>

    <Header
      participantA={participantA}
      participantB={participantB}
    />

    <div
      className={classNames(
        styles.body,
      )}
    >
      <Scrollbars
        autoHide
        className={classNames(
          styles.scrollbar,
        )}
        autoHeight
        autoHeightMin={145}
        autoHeightMax={434}
      >
        {tournamentDiscipline === 'csgo' ? (
          <ShooterStats
            matches={matches}
            mapHighlights={mapHighlights}
            hltvStats
          />
        ) : (
          <MobaStats
            matchId={matchId}
            mapHighlights={mapHighlights}
            participantA={participantA}
            dotabuffStats
          />
        )}
      </Scrollbars>
    </div>

  </div>
)

MatchDetails.propTypes = {
  // required props
  matches: PropTypes.shape({}).isRequired,
  mapHighlights: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onClose: PropTypes.func.isRequired,
  // container props
  tournamentDiscipline: PropTypes.string.isRequired,
  matchId: PropTypes.string.isRequired,
  participantA: PropTypes.shape({
    // uuid: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
  participantB: PropTypes.shape({
    // uuid: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
  // optional props
}

MatchDetails.defaultProps = {
  // optional props
}

export default container(MatchDetails)
