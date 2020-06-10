import React from 'react'
import PropTypes from 'prop-types'

import container from './container'

const Tab = ({
  isActive,
  tab,
  TabComponent,

  handleClick,
}) => (
  <TabComponent
    tab={tab}
    isActive={isActive}
    onClick={handleClick}
  />
)

Tab.propTypes = {
  isActive: PropTypes.bool.isRequired,
  tab: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  TabComponent: PropTypes.shape({}).isRequired,

  handleClick: PropTypes.func.isRequired,
}

export default container(Tab)
