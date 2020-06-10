import {
  compose,
  withHandlers,
  pure,
} from 'recompose'

const container = compose(
  pure,
  withHandlers({
    handleFocus: props => (event) => {
      event.target.readOnly = true // eslint-disable-line no-param-reassign
      if (props.onFocus) {
        props.onFocus(event)
      }
    },
  }),
)

export default container
