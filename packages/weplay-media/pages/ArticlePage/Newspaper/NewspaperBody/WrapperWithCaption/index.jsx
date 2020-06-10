import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'weplay-components/Icon'

import styles from './styles.scss'

const WrapperWithCaption = ({
  // required props
  children,
  // container props
  // optional props
  text,
}) => (
  text ? (
    <figure className={styles.block}>
      {children}

      <figcaption className={styles.caption}>
        <Icon
          iconName="img-clear"
          size="small"
          className={styles.icon}
        />
        <span className={styles.text}>
          {text}
        </span>
      </figcaption>
    </figure>
  ) : children
)

WrapperWithCaption.propTypes = {
  // required props
  children: PropTypes.node.isRequired,
  // container props
  // optional props
  text: PropTypes.string,
}

WrapperWithCaption.defaultProps = {
  // optional props
  text: '',
}

export default React.memo(WrapperWithCaption)
