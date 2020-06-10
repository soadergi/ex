import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'weplay-components/Icon'

import container from './container'
import styles from './styles.scss'

const TopCandidate = ({
  children,
  titleText,
  alertText,
}) => (
  <div className={styles.halfBlock}>
    <div className={styles.halfHeader}>
      <p className={styles.title}>
        {titleText}
      </p>
      <div className={styles.iconBlock}>
        <Icon
          iconName="info"
          className={styles.icon}
        />
      </div>
      <div className={styles.alert}>
        <span>
          {alertText}
        </span>
      </div>
    </div>
    {children}
  </div>
)

TopCandidate.propTypes = {
  children: PropTypes.node.isRequired,
  titleText: PropTypes.string.isRequired,
  alertText: PropTypes.string.isRequired,
}

export default container(TopCandidate)
