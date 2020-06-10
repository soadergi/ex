import React from 'react'
import PropTypes from 'prop-types'

import TabItem from './TabItem'
import container from './container'
import styles from './styles'

const Tabs = ({
  tabs,
  activeTab,
}) => (
  <div className={styles.block}>
    <ul className={styles.list}>
      {tabs.map(tab => (
        <TabItem
          key={tab}
          isActive={tab === activeTab}
          tab={tab}
        />
      ))}
    </ul>
  </div>
)

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeTab: PropTypes.string.isRequired,
}

export default container(Tabs)
