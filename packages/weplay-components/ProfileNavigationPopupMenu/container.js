import {
  compose, pure,
  withHandlers,
} from 'recompose'

import { withOnClickOutside } from 'weplay-components/withOnClickOutside'

const container = compose(
  pure,
  withHandlers({
    handleClickOutside: props => () => props.handleClick(),
  }),
  withOnClickOutside,
)

export default container
