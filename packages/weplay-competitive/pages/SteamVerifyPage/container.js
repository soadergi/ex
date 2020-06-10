import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import queryString from 'query-string'

import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'
import { axios } from 'weplay-core/services/axios'

import { STEAM_MESSAGE_TYPES } from 'weplay-competitive/constants/steamMessageTypes'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    globalScope: globalScopeSelector,
  }), {
    // actionCreators
  }),
  lifecycle({
    componentDidMount() {
      // TODO: extract to utils
      const acceptedOrigin = this.props.globalScope.location.hostname !== 'development.weplay.space'
        ? this.props.globalScope.location.origin
        : '*'
      const values = queryString.parse(this.props.location.search)
      axios.get('/user-management-service/v1/social/steam/validate', {
        params: values,
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => {
          this.props.globalScope.opener.postMessage(JSON.stringify({
            type: STEAM_MESSAGE_TYPES.ADD_STEAM_SUCCESS,
            nickname: response?.data?.nickname,
          }), acceptedOrigin)
        })
        .catch((error) => {
          this.props.globalScope.opener.postMessage(JSON.stringify({
            type: STEAM_MESSAGE_TYPES.ADD_STEAM_ERROR,
            error,
          }), acceptedOrigin)
        })
        .finally(() => {
          this.props.globalScope.close()
        })
    },
  }),
)

export default container
