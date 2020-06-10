import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Scrollbars } from 'react-custom-scrollbars'

import Image from 'weplay-components/Image'

import styles from './CharacterSkill.scss'

const CharacterSkill = ({
  name,
  levels,
  image,
}) => (
  <div className={styles.block}>
    <p className={styles.name}>{name}</p>
    {/* TODO: @frontend help with Scrollbars it eats part of content area */}
    <Scrollbars
      autoHeight
      universal
    >
      <div className={styles.ability}>
        <Image
          src={image}
          className={styles.image}
        />
        <ul className={styles.list}>
          {levels.map(level => (
            <li
              key={level}
              className={classNames(
                styles.cell,
                {
                  [styles.level]: level,
                },
              )}
            >
              {level}
            </li>
          ))}
        </ul>
      </div>
    </Scrollbars>
  </div>
)

CharacterSkill.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  levels: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

export default CharacterSkill
