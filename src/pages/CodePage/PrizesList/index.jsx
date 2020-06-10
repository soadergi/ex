import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.scss'
import container from './container'
import PrizeItem from './PrizeItem'

const PrizesList = ({
  // required props
  prizesList,

  // props from container

  // optional props
}) => (
  <ul className={styles.timeline}>
    { prizesList.map((prize, index) => (
      <PrizeItem
        key={prize.imageUrl} // TODO: write the correct key
        prize={prize}
        isEven={index % 2 !== 0}
      />
    ))}
  </ul>
)

PrizesList.propTypes = {
  // required props
  prizesList: PropTypes.arrayOf(PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    description: PropTypes.shape({
      en: PropTypes.shape({
        date: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        text: PropTypes.string,
      }),
      ru: PropTypes.shape({
        date: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        text: PropTypes.string,
      }),
    }),
  })).isRequired,

  // props from container

  // optional props
}

PrizesList.defaultProps = {
  // optional props
}


export default container(PrizesList)
