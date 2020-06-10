import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const withTabs = (WrappedComponent) => {
  const HOC = class extends PureComponent {
    constructor(props) {
      super(props)
      this.state = {
        activeTabIndex: props.initialActiveTabIndex,
      }
      this.switchCache = {}
    }

    handleTabClick = (tab) => {
      const index = this.props.tabs.indexOf(tab)
      if (!this.switchCache[index]) {
        this.switchCache[index] = () => this.setState({ activeTabIndex: index })
      }
      return this.switchCache[index]
    }

    render() {
      const { initialActiveTabIndex, tabs, ...restProps } = this.props
      return (
        <WrappedComponent
          {...restProps}
          tabs={tabs}
          activeTab={tabs[this.state.activeTabIndex]}
          handleTabClick={this.handleTabClick}
        />
      )
    }
  }

  HOC.propTypes = {
    initialActiveTabIndex: PropTypes.number,
    tabs: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({}),
    ])).isRequired,
  }

  HOC.defaultProps = {
    initialActiveTabIndex: 0,
  }

  return HOC
}

export default withTabs
