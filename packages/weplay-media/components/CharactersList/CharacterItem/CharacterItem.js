import React from 'react'
import PropTypes from 'prop-types'

import Link from 'weplay-components/Link'
import Image from 'weplay-components/Image'

import styles from './CharacterItem.scss'

const CharacterItem = ({
  сharacter,
}) => (
  <Link
    to={сharacter.link}
    className={styles.item}
  >
    <Image
      src={сharacter.image}
      alt={сharacter.name}
      className={styles.image}
    />
    <span className={styles.text}>{сharacter.name}</span>
  </Link>
)

CharacterItem.propTypes = {
  сharacter: PropTypes.shape({
    link: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
}

export default CharacterItem
