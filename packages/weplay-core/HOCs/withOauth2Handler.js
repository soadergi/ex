import queryString from 'query-string'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import { createStructuredSelector } from 'reselect'

import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'

const withOauth2Handler = compose(
  connect(createStructuredSelector({
    // selectors
    globalScope: globalScopeSelector,
  }), {
    // actionCreators
  }),
  // TODO: extract to HOC withOpenerListener
  withHandlers({
    handleOpenAuthPopup: ({
      config,
      globalScope,
    }) => () => {
      const queryURL = queryString.stringify(config.queryParams)
      globalScope.open(
        `${config.authLink}?${queryURL}`,
        'AuthPopup',
        'resizable,scrollbars,status',
      )
    },
  }),
)

export default withOauth2Handler
