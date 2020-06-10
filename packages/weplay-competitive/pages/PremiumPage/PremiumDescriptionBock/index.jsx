import React from 'react'
import PropTypes from 'prop-types'

import PremiumDescriptionCard from './PremiumDescriptionCard'
import container from './container'
import styles from './styles.scss'

const PremiumDescriptionBock = ({
  // required props
  descriptionCards,
  // container props

  // optional props

}) => (
  <div className={styles.block}>
    {descriptionCards.map(descriptionCard => (
      <PremiumDescriptionCard
        descriptionCard={descriptionCard}
        key={descriptionCard.id}
      />
    ))}
  </div>

)

PremiumDescriptionBock.propTypes = {
  // required props
  descriptionCards: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  // container props

  // optional props
}

PremiumDescriptionBock.defaultProps = {
  // optional props
}

export default container(PremiumDescriptionBock)
