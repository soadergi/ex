import React, { useState } from 'react'
import classNames from 'classnames'

import Button, { BUTTON_PRIORITY } from 'weplay-components/Button'
import Icon from 'weplay-components/Icon'

import styles from './CharacterAbilitiesNotes.scss'

const text = 'The stun and damage are applied in a circular shape around each segment. '
  + 'This means the total damage/stun area consists of multiple overlapping circles, and not a smooth line.\n'

const CharacterAbilitiesNotes = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const toggleNotes = () => { setIsExpanded(state => !state) }
  return (
    <>
      <div className={classNames(
        styles.content,
        {
          [styles.expanded]: isExpanded,
        },
      )}
      >
        <p className={styles.title}>Notes</p>
        <ul className={styles.list}>
          <li className={styles.item}>
            {text}
            <ul className={styles.subList}>
              <li className={styles.item}>{text}</li>
              <li className={styles.item}>{text}</li>
            </ul>
          </li>
          <li className={styles.item}>{text}</li>
        </ul>
      </div>
      <Button
        onClick={toggleNotes}
        priority={BUTTON_PRIORITY.LINK}
      >
        See notes
        <Icon
          className={classNames(
            styles.icon,
            { [styles.expanded]: isExpanded },
          )}
          iconName="arrow-expand"
        />
      </Button>
    </>
  )
}

export default CharacterAbilitiesNotes
