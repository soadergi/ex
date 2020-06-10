import {
  compose,
  withHandlers,
} from 'recompose'

const container = compose(
  withHandlers({
    handleBlur: props => (e) => {
      props.setFieldTouched(e.target.name, true)
    },
  }),
)

export default container
