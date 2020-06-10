import * as R from 'ramda'
import React, { PureComponent } from 'react'

import { authErrorCodeMap } from '../consts/authErrorCodeMap'

export default WrappedComponent => class extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      authErrorMessage: null,
    }
  }

  handleAuthError = (reject) => {
    const getErrorMessage = () => {
      const errorCode = R.path(['response', 'data', 'error', 'code'], reject)
      return authErrorCodeMap[errorCode] ?? null
    }
    return this.setState({
      authErrorMessage: getErrorMessage(),
    })
  }

  resetAuthError = () => {
    this.setState({
      authErrorMessage: null,
    })
  }

  render() {
    return (
      <WrappedComponent
        {...this.props}
        handleAuthError={this.handleAuthError}
        resetAuthError={this.resetAuthError}
        authErrorMessage={this.state.authErrorMessage}
      />
    )
  }
}
