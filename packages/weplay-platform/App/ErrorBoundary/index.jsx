import React from 'react'
import PropTypes from 'prop-types'

export default class ErrorBoundary extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
    }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch() {
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }

    return this.props.children || null
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
}
