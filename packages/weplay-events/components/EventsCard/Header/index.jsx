import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from 'weplay-components/Icon'
import Image from 'weplay-components/Image'
import Avatar from 'weplay-components/Avatar'
import eventCardPropType from 'weplay-events/customPropTypes/eventCardPropType'

import styles from './styles.scss'
import container from './container'

const DISCIPLNE_NAME = {
  'cs-go': 'CS:GO',
  dota2: 'Dota 2',
  artifact: 'Artifact',
  underlords: 'Dota Underlords',
}

const Header = ({
  isTournamentActive,
  event,
}) => (
  <div
    className={classNames(
      styles.block,
      {
        [styles.isTournamentArchived]: !isTournamentActive,
      },
    )}
  >
    <div className={styles.header}>
      <div className={styles.wrapDiscipline}>
        <Icon
          size="small"
          iconName={event.discipline}
          className={classNames(
            styles.icon,
          )}
        />
        <p className={styles.text}>{DISCIPLNE_NAME[event.discipline]}</p>
      </div>

      {!isTournamentActive ? (
        <div className={styles.wrapTournamentName}>
          <Image
            className={classNames(
              'u-mr-1',
              styles.image,
            )}
            src={event.tournamentLogo}
            alt=""
          />
          <p className={styles.text}>{event.tournamentTitle}</p>
        </div>
      ) : (
        <p className={styles.prizePool}>{event.prize}</p>
      )}
    </div>

    <Avatar
      className={styles.avatar}
      avatar={isTournamentActive ? event.tournamentLogo : event.winnerLogo}
    />

    {isTournamentActive ? (
      <p className={styles.title}>
        {event.tournamentTitle}
      </p>
    ) : (
      <div className={styles.wrapTitle}>
        <p className={styles.title}>
          {event.winnerTitle}
          <br />
          <span className={styles.prizePoolGold}>{event.prize}</span>
        </p>
      </div>
    )}
  </div>
)

Header.propTypes = {
  // required props
  event: eventCardPropType.isRequired,

  // container props

  // optional props
  isTournamentActive: PropTypes.bool,
}

Header.defaultProps = {
  // optional props
  isTournamentActive: false,
}

export default container(Header)
