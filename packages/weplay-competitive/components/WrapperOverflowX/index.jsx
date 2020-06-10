import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Wrapper from 'weplay-competitive/components/Wrapper'

import styles from './styles.scss'

const WrapperOverflowX = ({
  // required props
  children,
  // container props

  // optional props
  className,
}) => (
  <div className={classNames(
    styles.block,
    className,
  )}
  >
    <Wrapper className={styles.wrapper}>
      {children}
    </Wrapper>
  </div>
)

WrapperOverflowX.propTypes = {
  // required props
  children: PropTypes.node.isRequired,
  // container props

  // optional props
  className: PropTypes.string,
}

WrapperOverflowX.defaultProps = {
  // optional props
  className: '',
}

export default WrapperOverflowX
