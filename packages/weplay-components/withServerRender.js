import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { createStructuredSelector } from 'reselect'

const withServerRender = getInitialData => compose(
  connect(createStructuredSelector({
  }), {
    getInitialData,
  }),
  lifecycle({
    componentDidMount() {
      if (!this.props.renderedOnServer) {
        this.props.getInitialData(this.props, true)
      }
    },
  }),
)

export default withServerRender
