import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Button, { BUTTON_COLOR, BUTTON_SIZE } from 'weplay-components/Button'
import Image from 'weplay-components/Image'

import styles from './GameBanner.scss'

const GameBanner = ({
  title,
  text,
  button,
  link,
  image,
  className,
  imageClassName,
  buttonColor,
}) => (
  <div className={classNames(styles.block, className)}>
    <p className={styles.title}>
      {title}
    </p>
    <p className={styles.text}>
      {text}
    </p>
    <Button
      color={buttonColor}
      size={BUTTON_SIZE.SM}
      href={link}
      target="_blank"
    >
      {button}
    </Button>
    <Image
      className={imageClassName}
      src={image}
    />
  </div>
)

GameBanner.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  button: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  className: PropTypes.string,
  imageClassName: PropTypes.string,
  buttonColor: PropTypes.string,
}

GameBanner.defaultProps = {
  className: '',
  imageClassName: '',
  buttonColor: BUTTON_COLOR.CTA,
}

export default React.memo(GameBanner)
