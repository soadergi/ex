import { O_AUTH2_SUCCESS } from 'weplay-core/consts/oAuth2MessageTypes'
import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'
import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'
import { oauth2Login } from 'weplay-core/reduxs/_legacy/auth/actions'
import queryString from 'query-string'
import {
  compose,
  lifecycle,
} from 'recompose'
import { connect } from 'react-redux'
import { currentUserSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'
import { createStructuredSelector } from 'reselect'

const container = compose(
  connect(createStructuredSelector({
    currentUser: currentUserSelector,
    globalScope: globalScopeSelector,
  }), {
    oauth2Login,
  }),

  withPageViewAnalytics(),

  lifecycle({
    componentDidMount() {
      // TODO: extract to utils
      const acceptedOrigin = this.props.globalScope.location.hostname !== 'development.weplay.space'
        ? this.props.globalScope.location.origin
        : '*'

      const source = this.props.match.params.source
      const values = queryString.parse(this.props.location.search)
      const origin = this.props.globalScope.location.origin
      const pathWithSlash = pathWithParamsByRoute(NAMES.AUTH_VERIFY_CODE, {
        source,
      })

      // TODO: we also can catch here error during oauth from search params
      this.props.globalScope.opener.postMessage(JSON.stringify({
        type: O_AUTH2_SUCCESS,
        data: {
          code: values.code,
          redirect_uri: `${origin}${pathWithSlash}`,
          source,
        },
      }), acceptedOrigin)
      this.props.globalScope.close()
    },
  }),
)

export default container
