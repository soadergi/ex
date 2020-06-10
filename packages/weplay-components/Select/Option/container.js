import {
  compose,
  pure,
  withHandlers,
  withPropsOnChange,
} from 'recompose'

const container = compose(
  pure,
  withPropsOnChange([
    'option',
    'value',
  ], ({
    option,
    value,
  }) => ({
    isActive: option.value === value,
  })),
  withHandlers({
    handleChange: props => () => {
      props.onChange(props.option.value)
    },
  }),
)

export default container
