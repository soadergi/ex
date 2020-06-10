import * as R from 'ramda'
import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

import america from './img/North_America_Division.png'
import europe from './img/Europe_division.png'
import cross from './img/Cross_division.png'

const backgrounds = [america, europe, cross]

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'divisionIndex',
    'game',
  ], ({
    divisionIndex,
    game,
  }) => {
    const gamesDate = R.keys(game)[0]

    return ({
      gamesDate,
      gamesTimes: game[gamesDate],
      background: {
        backgroundImage: `url('${backgrounds[divisionIndex]}')`,
      },
    })
  }),
)

export default container
