import { createSelector } from 'reselect'
import * as R from 'ramda'

import {
  WIDTH_CHANGE,
  WIDTH_SM,
  WIDTH_LEGACY_MD,
  WIDTH_MD,
  WIDTH_TOURNAMENT_LG,
  HEADER_HEIGHT_CHANGE,
} from './consts'

const initialState = {
  windowWidth: 0,
  headerHeight: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case WIDTH_CHANGE:
      return {
        ...state,
        windowWidth: action.payload || state.windowWidth,
      }
    case HEADER_HEIGHT_CHANGE:
      return {
        ...state,
        headerHeight: action.payload,
      }
    default:
      return state
  }
}
export const LAYOUT_RN = 'LAYOUT'
const rootSelector = R.prop(LAYOUT_RN)
export const windowWidthSelector = createSelector(
  [rootSelector],
  R.prop('windowWidth'),
)
export const headerHeightSelector = createSelector(
  [rootSelector],
  R.prop('headerHeight'),
)

// LEGACY SELECTORS
// TODO: Remove this Legacy Selectors when we'll use new brakepoints everywhere
export const isStrictlyTabletWidthLegacySelector = createSelector(
  [windowWidthSelector],
  width => WIDTH_SM < width && width < WIDTH_LEGACY_MD,
)
export const isTabletWidthLegacySelector = createSelector(
  [windowWidthSelector],
  width => width < WIDTH_LEGACY_MD,
)
export const isMediumWidthLegacySelector = createSelector(
  [windowWidthSelector],
  width => WIDTH_LEGACY_MD <= width,
)

// ACTUAL SELECTORS SINCE 2019/06/18
export const isMobileWidthSelector = createSelector(
  [windowWidthSelector],
  width => (width > 0) && (width < WIDTH_SM),
)
export const isTabletWidthSelector = createSelector(
  [windowWidthSelector],
  width => (width > 0) && (width < WIDTH_MD),
)
export const isSmallLaptopTournamentSelector = createSelector(
  [windowWidthSelector],
  width => (width > 0) && (width < WIDTH_TOURNAMENT_LG),
)
