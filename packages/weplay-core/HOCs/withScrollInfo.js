import PropTypes from 'prop-types'
import * as R from 'ramda'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { globalScopeSelector } from '../reduxs/common/selectors'

const withScrollInfo = fieldKeys => (WrappedComponent) => {
  const HOC = class extends PureComponent {
    state = {
      scrollTop: 0,
    }

    componentDidMount() {
      // TODO: handle case where we don't need whole browserGlobal but
      // only separate container
      this.props.globalScope.addEventListener('scroll', this.updateScroll)
    }

    componentWillUnmount() {
      this.props.globalScope.removeEventListener('scroll', this.updateScroll)
    }

    // == fields ===
    get scrollTop() {
      return this.state.scrollTop
    }

    get scrollBottom() {
      return this.state.scrollTop + Number(this.props.globalScope.innerHeight)
    }

    get isScrolledTop() {
      return this.state.scrollTop > 0
    }

    get scrollPercent() {
      return (this.scrollBottom / this.props.globalScope.document.body.scrollHeight) * 100
    }

    get scrolledPercentWithStep25() {
      return Math.floor(this.scrollPercent / 25) * 25
    }

    get isScrolled30MorePercents() {
      return this.isScrolledTop && this.scrollPercent >= 30 // need isScrolledTop because it trigger while loading
    }

    updateScroll = () => {
      this.setState({
        scrollTop: this.props.globalScope.pageYOffset,
      })
    }

    render() {
      const fieldValues = R.map(fieldKey => R.prop(fieldKey, this))(fieldKeys)
      const fields = R.zipObj(fieldKeys, fieldValues)
      return (
        // TODO: rewrite to spread operator
        <WrappedComponent
          {...this.props}
          {...fields}
        />
      )
    }
  }

  HOC.propTypes = {
    globalScope: PropTypes.shape({
      addEventListener: PropTypes.func.isRequired,
      removeEventListener: PropTypes.func.isRequired,
      innerHeight: PropTypes.number.isRequired,
      pageYOffset: PropTypes.number.isRequired,
      document: PropTypes.shape({
        body: PropTypes.shape({
          scrollHeight: PropTypes.number.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }
  return connect(createStructuredSelector({
    // selectors
    globalScope: globalScopeSelector,
  }), {
    // actionCreators
  })(HOC)
}

export default withScrollInfo
