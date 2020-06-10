import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

const PERCENT_VALUES = {
  0: 0,
  25: 25,
  33: 33,
  50: 50,
  66: 66,
  75: 75,
  100: 100,
}
const PLAYER_LENGTH = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
}
// eslint-disable-next-line consistent-return
function getProgressByPosition(current, min, max) {
  // returns int progress percent
  // one of (0 25 33 50 66 75)

  // if only 1 player
  if (current === PLAYER_LENGTH['1']) return PERCENT_VALUES['50']

  // if number of players equals min section number
  if (current === min) return PERCENT_VALUES['0']

  // corner case if second section
  if (min === PLAYER_LENGTH['2']) {
    if (current === PLAYER_LENGTH['3']) return PERCENT_VALUES['33']
    if (current === PLAYER_LENGTH['4']) return PERCENT_VALUES['66']
  }

  // common logic for all other cases
  const percent = ((current - min) / (max - min + 1)) * PERCENT_VALUES['100']
  if (percent <= PERCENT_VALUES['25']) return PERCENT_VALUES['25']
  if (percent <= PERCENT_VALUES['50']) return PERCENT_VALUES['50']
  return PERCENT_VALUES['75']
}

const container = compose(
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'item',
    'countParticipants',
    'isLast',
  ], ({
    item,
    countParticipants,
    isLast,
  }) => ({
    isActive: item.minPosition <= countParticipants && item.maxPosition >= countParticipants,
    wasPassed: countParticipants > item.maxPosition,
    allPassed: isLast && (countParticipants >= item.minPosition),
  })),

  withPropsOnChange([
    'item',
    'isActive',
    'countParticipants',
  ], ({
    item,
    isActive,
    countParticipants,
  }) => isActive && ({
    progress: getProgressByPosition(countParticipants, item.minPosition, item.maxPosition),
  })),

  withPropsOnChange([
    'progress',
  ], ({
    progress,
  }) => ({
    totalStyle: { left: `${progress}%` },
    progressStyle: { width: `${progress}%` },
    wasPassedStyle: { width: '100%' },
  })),

)

export default container
