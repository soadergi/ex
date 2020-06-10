import {
  compose,
  withPropsOnChange,
} from 'recompose'

import { FUTURE_TOURNAMENT_CARD_TYPES } from './constants'
import qualificationBg from './img/qualification.jpg'
import placeholderBg from './img/placeholder.jpg'

const container = compose(
  withPropsOnChange([
    'event',
  ], ({
    event,
  }) => ({
    isQualification: event.tournamentType && event.tournamentType === FUTURE_TOURNAMENT_CARD_TYPES.qualification,
  })),

  withPropsOnChange([
    'event',
    'isQualification',
  ], ({
    event,
    isQualification,
  }) => ({
    cardBackground: event.tournamentBg || (isQualification ? qualificationBg : placeholderBg),
  })),

)

export default container
