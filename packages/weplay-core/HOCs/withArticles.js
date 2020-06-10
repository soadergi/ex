import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import { getArticles } from 'weplay-core/reduxs/_legacy/articles/actions'
import config from 'weplay-core/config'

const withArticles = (WrappedComponent) => {
  const HOC = class extends PureComponent {
    componentDidMount() {
      this.fetchArticles()
    }

    componentDidUpdate(prevProps) {
      if (prevProps.locale !== this.props.locale) {
        this.fetchArticles()
      }
    }

    fetchArticles = () => {
      const { locale, requestArticlesParams } = this.props

      this.props.getArticles({
        params: {
          language: locale,
          ...requestArticlesParams,
        },
      })
    }

    render() {
      const { requestArticlesParams, ...restProps } = this.props

      return (
        <WrappedComponent
          {...restProps}
        />
      )
    }
  }
  HOC.propTypes = {
    locale: PropTypes.oneOf(config.languages).isRequired,
    requestArticlesParams: PropTypes.shape({}).isRequired,
    getArticles: PropTypes.func.isRequired,
  }
  return HOC
}

const container = compose(
  withLocale,
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
    getArticles,
  }),
  withArticles,
)

export default container
