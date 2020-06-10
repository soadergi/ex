import React from 'react'
import PropTypes from 'prop-types'

import Tab from './Tab'
import container from './container'

const Tabs = ({
  tabs,
  activeTab,
  TabComponent,

  onChange,
}) => tabs.map(tab => (
  <Tab
    key={tab.id}
    isActive={tab.id === activeTab.id}
    tab={tab}
    onClick={onChange}
    TabComponent={TabComponent}
  />
))

Tabs.propTypes = {
  activeTab: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  TabComponent: PropTypes.shape({}).isRequired,

  onChange: PropTypes.func.isRequired,
}

Tabs.defaultProps = {
}

export default container(Tabs)
