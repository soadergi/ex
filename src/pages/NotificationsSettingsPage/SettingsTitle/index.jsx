import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'weplay-components/Icon'

import IconList from '../IconList'

import container from './container'
import styles from './styles.scss'

const SettingsTitle = ({
  // required props
  settingsTitle,

  // container props

  // optional props
}) => (
  <div className={styles.block}>
    <div className={styles.titleBlock}>
      <Icon
        iconName="weplay"
        className={styles.icon}
      />
      <span className={styles.title}>
        {settingsTitle}
      </span>
    </div>
    <IconList />
  </div>
)

SettingsTitle.propTypes = {
  // required props
  settingsTitle: PropTypes.string.isRequired,

  // container props

  // optional props
}

SettingsTitle.defaultProps = {
  // optional props
}

export default container(SettingsTitle)
