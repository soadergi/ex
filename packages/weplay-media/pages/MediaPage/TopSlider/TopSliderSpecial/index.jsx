import React from 'react'
import PropTypes from 'prop-types'
import i18nTextsPropType from 'weplay-core/customPropTypes/i18nTextsPropType'
import Link from 'weplay-components/Link'
import SpecialLabel from 'weplay-components/SpecialLabel'
import Image from 'weplay-components/Image'

import styles from '../TopSliderNewspaper/styles.scss'

import container from './container'

const TopSliderSpecial = ({
  i18nTexts,
  sliderSpecial,
  onClick,
}) => (
  <div className={styles.block}>
    <Link
      to={sliderSpecial.url}
      className={styles.link}
      onClick={onClick}
    >
      <Image
        className="o-img-responsive"
        alt={sliderSpecial.backgroundAlt}
        src={sliderSpecial.backgroundUrl}
      />
      <Image
        className={styles.avatar}
        alt={sliderSpecial.avatarAlt}
        src={sliderSpecial.avatarUrl}
      />
      <p className={styles.title}>
        {sliderSpecial.title}
      </p>
    </Link>

    <div className={styles.header}>
      <SpecialLabel />
      <span className={styles.metaItem}>
        {`${sliderSpecial.newsCount} ${i18nTexts.topSlider.counterTitle}`}
      </span>
    </div>
  </div>
)

TopSliderSpecial.propTypes = {
  sliderSpecial: PropTypes.shape({
    url: PropTypes.string.isRequired,
    backgroundAlt: PropTypes.string.isRequired,
    backgroundUrl: PropTypes.string.isRequired,
    avatarAlt: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    newsCount: PropTypes.number.isRequired,
  }).isRequired,
  i18nTexts: i18nTextsPropType.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default container(TopSliderSpecial)
