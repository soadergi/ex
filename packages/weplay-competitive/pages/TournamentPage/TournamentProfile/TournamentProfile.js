import React from 'react'

import BackgroundImg from 'weplay-components/BackgroundImg'

import tournamentPropType from 'weplay-competitive/customPropTypes/tournamentPropType'

import styles from './TournamentProfile.scss'

const TournamentProfile = ({
  tournament,
}) => {
  const background = tournament?.backgroundAvatar ?? ''

  return (
    <div className={styles.block}>
      <BackgroundImg
        src={background}
      />
    </div>
  )
}

TournamentProfile.propTypes = {
  tournament: tournamentPropType.isRequired,
}

export default TournamentProfile
