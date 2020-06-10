import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from 'weplay-components/Icon'
import CopyLink from 'weplay-components/CopyLink/loadable'

import container from './container'
import styles from './styles.scss'


const CopyToClipboardServerLink = ({
  // required props
  text,
  // container props

  // optional props
  className,
}) => (
  <CopyLink
    text={text}
    tooltipIcon="check"
    className={classNames(
      styles.block,
      className,
    )}
  >
    <span className={styles.text}>
      {text}
      <Icon
        className={styles.icon}
        iconName="link"
      />
    </span>
  </CopyLink>
)

CopyToClipboardServerLink.propTypes = {
  // required props
  text: PropTypes.string.isRequired,
  // container props

  // optional props
  className: PropTypes.string,
}

CopyToClipboardServerLink.defaultProps = {
  // optional props
  className: '',
}

export default container(CopyToClipboardServerLink)
