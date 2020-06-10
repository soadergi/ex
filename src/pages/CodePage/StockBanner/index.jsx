import React from 'react'
// import PropTypes from 'prop-types'
import classNames from 'classnames'
import PropTypes from 'prop-types'


import container from './container'
import styles from './styles.scss'

const StockBanner = ({
  // required props
  bannerTitleOne,

  bannerTitleTwo,
  title,
  subTitle,
  description,
  imageUrl,
  alt,
  bannerTitleThree,
  bannerTitleFour,
  // container props

  // optional props
}) => (
  <div className={styles.block}>
    <div className={styles.section}>
      <p className={styles.text}>
        {bannerTitleOne}
      </p>
      <p className={classNames(
        styles.text,
        styles.colorGray,
      )}
      >
        {bannerTitleTwo}
      </p>
    </div>

    <div className={styles.textBlock}>
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{description}</p>
      <p className={styles.subTitle}>{subTitle}</p>
    </div>
    <img
      src={imageUrl}
      className={styles.img}
      alt={alt}
    />
    <div className={styles.section}>
      <p className={classNames(
        styles.text,
        styles.colorGray,
      )}
      >
        {bannerTitleThree}
      </p>
      <p className={styles.text}>
        {bannerTitleFour}
      </p>
    </div>
  </div>

)

StockBanner.propTypes = {
  // required props
  bannerTitleOne: PropTypes.string.isRequired,
  bannerTitleTwo: PropTypes.string.isRequired,
  bannerTitleThree: PropTypes.string.isRequired,
  bannerTitleFour: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  // container props

  // optional props
}

StockBanner.defaultProps = {
  // optional props
}

export default container(StockBanner)
