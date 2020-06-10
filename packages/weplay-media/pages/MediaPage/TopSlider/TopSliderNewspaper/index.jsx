import React from 'react'
import PropTypes from 'prop-types'
import Link from 'weplay-components/Link'
import articleImagePropType from 'weplay-core/customPropTypes/articleImagePropType'
import Image from 'weplay-components/Image'

import styles from './styles.scss'
import container from './container'

const TopSliderNewspaper = ({
  sliderNewspaper,
  onClick,
}) => (
  <div className={styles.block}>
    <Link
      to={sliderNewspaper.url}
      className={styles.link}
      onClick={onClick}
    >
      <Image
        className="o-img-responsive"
        alt={sliderNewspaper.image.alt}
        src={sliderNewspaper.image.url}
      />
      <p className={styles.title}>
        {sliderNewspaper.title}
      </p>
    </Link>
  </div>
)

TopSliderNewspaper.propTypes = {
  sliderNewspaper: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    image: articleImagePropType.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
}

export default container(TopSliderNewspaper)
