import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Scrollbars } from 'react-custom-scrollbars'

import styles from './styles.scss'
import container from './container'

const minHeightTabsHorizontalScroll = 42

const Tabs = ({
  // required props
  children,
  // container props

  // optional props
  className,
  childClassName,
  isCentered,
  hasSeparator,
}) => (
  <div className={className}>
    <Scrollbars
      autoHide
      autoHeight
      autoHeightMin={minHeightTabsHorizontalScroll}
    >
      <ul className={classNames(
        styles.list,
        childClassName,
        {
          [styles.isCentered]: isCentered,
          [styles.hasSeparator]: hasSeparator,
        },
      )}
      >
        {children}
      </ul>
    </Scrollbars>
  </div>
)

Tabs.propTypes = {
  // required props
  children: PropTypes.node.isRequired,
  // container props

  // optional props
  className: PropTypes.string,
  childClassName: PropTypes.string,
  isCentered: PropTypes.bool,
  hasSeparator: PropTypes.bool,
}

Tabs.defaultProps = {
  // optional props
  className: '',
  childClassName: '',
  isCentered: false,
  hasSeparator: false,
}

export default container(Tabs)
