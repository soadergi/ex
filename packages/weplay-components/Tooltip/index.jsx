import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import container from './container'
import styles from './styles.scss'
import TooltipBubble from './TooltipBubble/TooltipBubble'

const Tooltip = ({
  // required props
  children,
  tooltip,
  // container props
  isTooltipViewed,
  handleTooltipClosing,
  handleLinkClick,
  // optional props
  position,
  className,
}) => (
  <div className={classNames(styles.wrapper, className)}>
    { children }
    {!isTooltipViewed && (
      <TooltipBubble
        tooltip={tooltip}
        position={position}
        onCloseButtonClick={handleTooltipClosing}
        onLinkClick={handleLinkClick}
      />
    )}
  </div>
)

Tooltip.propTypes = {
  // required props
  children: PropTypes.node.isRequired,
  tooltip: PropTypes.shape({}).isRequired,
  // container props
  isTooltipViewed: PropTypes.bool.isRequired,
  handleTooltipClosing: PropTypes.func.isRequired,
  handleLinkClick: PropTypes.func.isRequired,
  // optional props
  position: PropTypes.string,
  className: PropTypes.string,
}

Tooltip.defaultProps = {
  position: 'leftTop',
  className: '',
}

export default container(Tooltip)
