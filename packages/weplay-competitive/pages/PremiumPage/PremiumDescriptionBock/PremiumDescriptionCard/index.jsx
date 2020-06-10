import React from 'react'
import PropTypes from 'prop-types'
import imgPropType from 'weplay-core/customPropTypes/imgPropType'

import container from './container'
import styles from './styles.scss'

const PremiumDescriptionCard = ({
  // required props
  descriptionCard,
  // container props

  // optional props
}) => (
  <div className={styles.block}>
    <div className={styles.imgBlock}>
      <img
        src={descriptionCard.image}
        alt={descriptionCard.title}
        className="o-img-responsive"
      />
    </div>
    <p className={styles.title}>
      {descriptionCard.title}
    </p>
    <span className={styles.description}>
      {descriptionCard.description}
    </span>
  </div>

)

PremiumDescriptionCard.propTypes = {
  // required props
  descriptionCard: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    image: imgPropType,
  }).isRequired,
  // container props

  // optional props
}

PremiumDescriptionCard.defaultProps = {
  // optional props
}

export default container(PremiumDescriptionCard)
