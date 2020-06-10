import {
  compose,
  withStateHandlers,
  withHandlers, pure,
} from 'recompose'
import { withOnClickOutside } from 'weplay-components/withOnClickOutside'

const container = compose(
  pure,
  withStateHandlers({
    isVisible: false,
  }, {
    toggleDropDown: ({ isVisible }) => () => ({
      isVisible: !isVisible,
    }),
    closeDropDown: () => () => ({
      isVisible: false,
    }),
  }),
  withHandlers({
    handleClick: props => () => {
      props.toggleDropDown()
      if (props.callback) {
        props.callback()
      }
    },
    handleClickOutside: props => () => props.closeDropDown(),
  }),
  withOnClickOutside,
)

export default container
