import React from 'react'
import PropTypes from 'prop-types'

import Image from 'weplay-components/Image'

import styles from './CharacterAttribute.scss'

const CharacterAttribute = ({ сharacter }) => (
  <div className={styles.block}>
    <Image
      className={styles.image}
      src={сharacter.image}
    />
    <span className={styles.value}>{сharacter.value}</span>
    {сharacter.rise && (
      <span className={styles.rise}>{сharacter.rise}</span>
    )}
  </div>
)

CharacterAttribute.propTypes = {
  сharacter: PropTypes.shape({
    value: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    rise: PropTypes.string.isRequired,
  }).isRequired,
}

export default CharacterAttribute
