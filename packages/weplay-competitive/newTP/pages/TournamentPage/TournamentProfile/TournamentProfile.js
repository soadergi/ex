import React from 'react'

import imgPropType from 'weplay-core/customPropTypes/imgPropType'

import BackgroundImg from 'weplay-components/BackgroundImg'

import styles from './TournamentProfile.scss'

const TournamentProfile = ({
  background,
}) => (
  <div className={styles.block}>
    <BackgroundImg
      src={background}
    />
  </div>
)

TournamentProfile.propTypes = {
  background: imgPropType.isRequired,
}

export default TournamentProfile
