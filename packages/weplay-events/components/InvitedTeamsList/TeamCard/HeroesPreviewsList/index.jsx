import React from 'react'
import PropTypes from 'prop-types'
import Image from 'weplay-components/Image'

import container from './container'
import styles from './styles.scss'

const HeroesPreviewsList = ({
  // required props
  previews,

  // container props

  // optional props
}) => (
  <ul className={styles.block}>
    {previews.map(hero => (
      <li className={styles.item}>
        <Image
          key={hero.name}
          src={hero.url}
          alt={hero.name}
          className="o-img-responsive"
        />
      </li>
    ))}
  </ul>
)

HeroesPreviewsList.propTypes = {
  // required props
  previews: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  // container props

  // optional props
}

export default container(HeroesPreviewsList)
