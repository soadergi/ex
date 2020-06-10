import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import imgPropType from 'weplay-core/customPropTypes/imgPropType'
import Image from 'weplay-components/Image'

import container from './container'
import styles from './styles.scss'

const BackgroundImg = ({
  // required props
  src,

  // container props
  // optional props
  backgroundAlignX,
  className,
  ...props
}) => (
  <Image
    src={src}
    className={classNames(
      styles.image,
      className,
      styles[backgroundAlignX],
    )}
    {...props}
  />
)

BackgroundImg.propTypes = {
  // required props
  backgroundAlignX: PropTypes.string,
  src: imgPropType.isRequired,

  // container props

  // optional props
  className: PropTypes.string,
}

BackgroundImg.defaultProps = {
  // optional props
  backgroundAlignX: '',
  className: '',
}

export default container(BackgroundImg)
