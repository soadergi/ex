import {
  compose,
  withPropsOnChange,
} from 'recompose'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import transliterate from 'weplay-core/helpers/translit'
import { originSelector } from 'weplay-core/reduxs/common/selectors'
import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'

import withDiscipline from 'weplay-competitive/HOCs/withDiscipline'

const digitsAfterPoint = 2
const formatValue = (value) => {
  if (value % 1) {
    return parseFloat(value).toFixed(digitsAfterPoint)
  }
  return value
}

const container = compose(
  withRouter,
  withDiscipline,
  connect(createStructuredSelector({
    // selectors
    origin: originSelector,
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'totalRewards',
  ], ({
    totalRewards,
  }) => ({
    rewards: R.prepend(
      {
        money: null,
        minPosition: 0,
        maxPosition: 1,
        isBegin: true,
      },
      R.map(
        item => ({
          money: formatValue(Number(item.amountTotalUsd)),
          minPosition: item.minPosition,
          maxPosition: item.maxPosition,
        }),
      )(totalRewards),
    ),
  })),

  withPropsOnChange([
    'currentTournament',
  ], ({
    currentTournament,
  }) => ({
    totalSlots: R.prop('totalSlots', currentTournament),
    emptySlots: R.prop('emptySlots', currentTournament),
  })),

  withPropsOnChange([
    'origin',
    'currentTournament',
    'discipline',
  ], ({
    origin,
    currentTournament,
    discipline,
  }) => {
    const pathWithParams = pathWithParamsByRoute(NAMES.TOURNAMENT, {
      tournamentId: currentTournament.id,
      tournamentName: transliterate(currentTournament.name),
      discipline,
    })
    return ({
      inviteLink: `${origin}${pathWithParams}`,
    })
  }),
)

export default container
