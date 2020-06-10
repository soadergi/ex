import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { createStructuredSelector } from 'reselect'
import { verifyUserEmail, verifyUserPassword } from 'weplay-core/reduxs/_legacy/auth/actions'

const container = compose(
  connect(createStructuredSelector({
  }), {
    verifyEmail: verifyUserEmail,
    verifyPassword: verifyUserPassword,
  }),

  withPageViewAnalytics(),

  lifecycle({
    componentDidMount() {
      const {
        verifyEmail,
        verifyPassword,
        history: { push },
      } = this.props
      const url = window.location.pathname
      const posVE = url.indexOf('verify-email')
      const posVP = url.indexOf('verify-pass')
      const code = url.substring(url.lastIndexOf('/') + 1)

      if (posVE !== -1) {
        verifyEmail({ code })
        push(`${url.substring(0, posVE)}`)
      } else if (posVP !== -1) {
        verifyPassword({ code })
        push(`${url.substring(0, posVP)}`)
      }
    },
  }),
)

export default container
