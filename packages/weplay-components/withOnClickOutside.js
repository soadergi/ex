import listensToClickOutside from 'react-onclickoutside'
import { branch } from 'recompose'

export const withOnClickOutside = branch(
  () => typeof window !== 'undefined',
  listensToClickOutside,
)
