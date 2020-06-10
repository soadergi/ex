import PropTypes from 'prop-types'
import React from 'react'
import Icon from 'weplay-components/Icon'
import classNames from 'classnames'
import { setCSSModifiers } from 'weplay-core/helpers/setCSSModifiers'

import container from './container'
import styles from './styles.scss'

const SuccessBlock = ({
  // required props
  subscription,
  // container props
  // optional props
  modifiers,
}) => (
  <div className={classNames(
    styles.block,
    setCSSModifiers(modifiers, styles),
  )}
  >
    <div className={styles.iconWrap}>
      <Icon
        className={styles.icon}
        iconName="check"
      />
    </div>

    <div className={styles.successBlock}>
      <p className={styles.successTitle}>
        {subscription.successTitle}
      </p>

      <p className={styles.successDescription}>
        {subscription.successText}
      </p>
    </div>
  </div>
)

SuccessBlock.propTypes = {
  // required props
  subscription: PropTypes.shape({
    successTitle: PropTypes.string,
    successText: PropTypes.string,
  }).isRequired,
  modifiers: PropTypes.arrayOf(PropTypes.string).isRequired,
  // container props
  // optional props
}

SuccessBlock.defaultProps = {
  // optional props
}

export default container(SuccessBlock)
