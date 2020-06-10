import {
  compose, withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

const container = compose(
  connect(createStructuredSelector({
  }), {

  }),
  withHandlers({
    handleClick: ({
      logSocialClick,
      iconName,
    }) => () => logSocialClick(iconName),
  }),
)

export default container
