import React from 'react'
import { createEmptyArray } from 'weplay-core/helpers/createEmptyArray'

import styles from './style.scss'

const NUMBER_OF_DIVS = 50

function AudioWave() {
  return (
    <div className={styles.levels}>
      {createEmptyArray(NUMBER_OF_DIVS).map((item, index) => (
        <div
          key={index} // eslint-disable-line react/no-array-index-key
          className={styles.level}
        />
      ))}
    </div>
  )
}

export default AudioWave
