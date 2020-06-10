import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import imgPropType from 'weplay-core/customPropTypes/imgPropType'
import BackgroundImg from 'weplay-components/BackgroundImg'

import container from './container'
import styles from './styles.scss'

const BackgroundFullWidth = ({
  // required props
  src,

  // container props
  // optional props
  backgroundAlignX,
  children,
  className,
  ...props
}) => (
  <div
    className={classNames(
      styles.block,
      className,
    )}
  >
    <BackgroundImg
      src={src}
      {...props}
      backgroundAlignX={backgroundAlignX}
    />
    {children}
  </div>
)

BackgroundFullWidth.propTypes = {
  // required props
  backgroundAlignX: PropTypes.string,
  src: imgPropType.isRequired,

  // container props

  // optional props
  children: PropTypes.node,
  className: PropTypes.string,
}

BackgroundFullWidth.defaultProps = {
  // optional props
  backgroundAlignX: '',
  children: null,
  className: '',
}

export default container(BackgroundFullWidth)
