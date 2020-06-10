import {
  compose,
  lifecycle,
  withHandlers,
  withProps,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import queryString from 'query-string'

import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'
import { openLoginModal } from 'weplay-core/reduxs/_legacy/modals/actions'
import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { axios } from 'weplay-core/services/axios'

import decor from './img/zendeskVerifyCover.svg'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    globalScope: globalScopeSelector,
    isLoggedIn: isLoggedInSelector,
  }), {
    // actionCreators
    openLoginModal,
  }),
  /* eslint-disable no-shadow */
  withHandlers({
    getUMSRequest: ({ location }) => () => {
      const params = queryString.parse(location.search)
      axios.get('/user-management-service/v1/auth/zendesk', {
        headers: { 'Content-Type': 'application/json' },
        params,
      })
    },
    handleClickLoginButton: ({ openLoginModal }) => () => {
      openLoginModal()
    },
  }),

  lifecycle({
    componentDidMount() {
      const { isLoggedIn, openLoginModal, getUMSRequest } = this.props
      if (!isLoggedIn) {
        openLoginModal()
      } else {
        getUMSRequest()
      }
    },
    componentDidUpdate(prevProps) {
      const { isLoggedIn, getUMSRequest } = this.props
      if (!prevProps.isLoggedIn && isLoggedIn) {
        getUMSRequest()
      }
    },
  }),
  withProps(() => ({
    background: {
      backgroundImage: `url('${decor}')`,
    },
  })),
)

export default container
