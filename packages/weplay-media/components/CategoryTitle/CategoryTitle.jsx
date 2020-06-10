import React from 'react'
import PropTypes from 'prop-types'

import Image from 'weplay-components/Image'
import Skeleton from 'weplay-components/Skeleton'

import styles from './CategoryTitle.scss'

const CategoryTitle = ({
  logo,
  title,
  text,
}) => (
  <div className={styles.block}>
    <div className={styles.wrap}>
      <Image
        src={logo}
        className={styles.logo}
      />
      <h1 className={styles.title}>{title || <Skeleton size="medium" />}</h1>
    </div>
    <p className={styles.text}>{text}</p>
  </div>
)

CategoryTitle.propTypes = {
  logo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default React.memo(CategoryTitle)
