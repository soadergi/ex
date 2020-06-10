import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Label from 'weplay-components/Label'

import container from './container'
import styles from './styles.scss'

const Slide = ({
  // required props
  isActive,
  tag,
  title,
  text,
  imageUrl,
  // container props
  // optional props
  textBold,
  logoTitle,
}) => (
  <div className={classNames(
    styles.block,
    {
      [styles.isActive]: isActive,
    },
  )}
  >
    <div className={styles.imageWrap}>
      <img
        src={imageUrl}
        alt="slider"
        className={styles.image}
      />
    </div>

    <div className={styles.wrap}>
      <Label
        color="magenta"
        className={styles.tag}
      >
        {tag}
      </Label>
      <p className={styles.title}>
        <span className={styles.logoTitle}>{logoTitle}</span>
        {` ${title}`}
      </p>
      <p className={styles.text}>
        {`${text} `}
        <strong>{textBold}</strong>
      </p>
    </div>
  </div>
)

Slide.propTypes = {
  // required props
  isActive: PropTypes.bool.isRequired,
  tag: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  // container props
  // optional props
  logoTitle: PropTypes.string,
  textBold: PropTypes.string,
}

Slide.defaultProps = {
  // optional props
  logoTitle: '',
  textBold: '',
}

export default container(Slide)
