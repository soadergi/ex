import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import container from './container'
import styles from './styles.scss'

export const PADDING_Y = {
  NONE: 'none',
  SM: 'sm',
}

export const BACKGROUNDS = {
  GRAY: 'gray',
  ROYAL: 'royal',
}

export const BORDER = {
  BOTTOM: 'bottom',
  TOP: 'top',
}

export const BORDER_COLOR = {
  LIGHT: 'light',
  DARK: 'dark',
}

const Section = ({
  // required props
  children,
  // container props

  // optional props
  hasBorder,
  borderColor,
  paddingY,
  backgrounds,
  className,
  style,
  id,
  hasBorderBottom,
  ...props
}) => (
  <section
    id={id}
    style={style}
    className={classNames(
      styles.block,
      styles[paddingY],
      styles[backgrounds],
      styles[hasBorder],
      styles[borderColor],
      className,
    )}
    {...props}
  >
    {children}
  </section>

)

Section.propTypes = {
  // required props
  children: PropTypes.node.isRequired,

  // container props

  // optional props
  hasBorderBottom: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.shape({}),
  id: PropTypes.string,
  paddingY: PropTypes.oneOf([...Object.values(PADDING_Y), '']),
  backgrounds: PropTypes.oneOf([...Object.values(BACKGROUNDS), '']),
  hasBorder: PropTypes.oneOf([...Object.values(BORDER), '']),
  borderColor: PropTypes.oneOf([...Object.values(BORDER_COLOR), '']),
}

Section.defaultProps = {
  // optional props
  className: '',
  backgrounds: '',
  style: {},
  id: '',
  hasBorder: '',
  borderColor: '',
  paddingY: '',
  hasBorderBottom: false,
}

export default container(Section)
