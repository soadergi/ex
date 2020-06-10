import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import styles from './GuessWinnersStepsList.scss'

const GuessWinnersStepsList = ({ list }) => {
  const t = useTranslation()

  return (
    <ul className={styles.block}>
      {list.map(item => (
        <li
          key={item.id}
          className={styles.item}
        >
          <p className={styles.number}>{item.id}</p>

          <p className={styles.title}>{t(`${item.title}`)}</p>

          <p className={styles.description}>{t(`${item.description}`)}</p>
        </li>
      ))}
    </ul>
  )
}

GuessWinnersStepsList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
  })).isRequired,
}

export default GuessWinnersStepsList
