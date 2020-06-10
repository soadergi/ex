import React, { useState } from 'react'
import classNames from 'classnames'

import Icon from 'weplay-components/Icon'

import styles from './CharacterChange.scss'

const CharacterChange = ({ }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const toggleDetails = () => { setIsExpanded(state => !state) }
  return (
    <div className={styles.block}>
      <div className={styles.head}>
        <div>
          <p className={styles.title}>Version 7.23</p>
          <p className={styles.date}>09/19/20</p>
        </div>
        <button
          type="button"
          className={styles.button}
          onClick={toggleDetails}
        >
          <span>Hide details</span>
          <Icon
            iconName="arrow-expand"
            size="small"
            className={classNames(
              styles.icon,
              { [styles.expanded]: !isExpanded },
            )}
          />
        </button>
      </div>
      {!isExpanded && (
      <div className={styles.body}>
        <p className={styles.name}>Enchant Totem</p>
        <ul className={styles.list}>
          <li className={styles.item}>Now also grants 75 attack range for the buffed attack.</li>
          <li className={styles.item}>Now also grants 75 attack range for the buffed attack.</li>
          <li className={styles.item}>Now also grants 75 attack range for the buffed attack.</li>
        </ul>
        <p className={styles.name}>Enchant Totem</p>
        <ul className={styles.list}>
          <li className={styles.item}>Now also grants 75 attack range for the buffed attack.</li>
        </ul>
      </div>
      )}
    </div>
  )
}

export default CharacterChange
