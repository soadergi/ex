import React from 'react'
import PropTypes from 'prop-types'
import Image from 'weplay-components/Image'
import imgPropType from 'weplay-core/customPropTypes/imgPropType'

import styles from '../styles.scss'

import container from './container'

const LeagueTeaser = ({
  // required props
  showTeaser,
  text,
  duration,
  previewImg,

  // container props

  // optional props
}) => (
  <button
    type="button"
    className={styles.buttonTeaser}
    onClick={showTeaser}
  >
    <Image
      className={styles.curLeagueTeaser}
      src={previewImg}
      alt="nextLeagueTeaser"
    />
    <span className={styles.videoInfo}>{duration}</span>
    <h3 className={styles.teaserTitle}>{text}</h3>
  </button>

)

LeagueTeaser.propTypes = {
  // required props

  // container props
  showTeaser: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  previewImg: imgPropType.isRequired,

  // optional props
}

LeagueTeaser.defaultProps = {
  // optional props
}

export default container(LeagueTeaser)
