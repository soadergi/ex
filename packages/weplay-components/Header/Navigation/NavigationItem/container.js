import {
  compose,
  pure,
  withPropsOnChange,
} from 'recompose'

const container = compose(
  pure,
  withPropsOnChange([
    'routeInfo',
    'navigationItem',
  ], ({
    routeInfo,
    navigationItem,
  }) => ({
    isActive: navigationItem.project === routeInfo.project,
  })),
)

export default container
