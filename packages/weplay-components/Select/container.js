import * as R from 'ramda'
import {
  compose,
  withProps,
  withStateHandlers,
  withHandlers,
  pure,
} from 'recompose'

import { withOnClickOutside } from '../withOnClickOutside'

const container = compose(
  pure,
  withStateHandlers({
    isOpen: false,
  }, {
    toggleSelect: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    }),
    hideSelect: () => () => ({
      isOpen: false,
    }),
  }),

  withProps(({ placeholder, options, value }) => ({
    placeholder: placeholder || R.pipe(
      R.find(R.propEq('value', value)),
      R.prop('label'),
    )(options),
  })),

  withHandlers({
    handleChange: props => (value) => {
      props.toggleSelect()
      props.onChange(value)
    },
    handleClickOutside: props => () => props.hideSelect(),
  }),
  withOnClickOutside,
)

export default container
