import { createAction } from 'redux-actions'

import {
  WIDTH_CHANGE,
  HEADER_HEIGHT_CHANGE,
} from './consts'

export const saveWindowWidth = createAction(WIDTH_CHANGE)
export const saveHeaderHeight = createAction(HEADER_HEIGHT_CHANGE)
