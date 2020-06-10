import {
  compose,
  withProps,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

import { tournamentGroupsWithParticipantSelector } from 'weplay-events/reduxs/tournaments/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
    groups: tournamentGroupsWithParticipantSelector,
  }), {
    // actionCreators
  }),

  withProps(() => ({
    pointsDistribution: [
      {
        place: '1st',
        point: '10',
        iconCup: true,
      },
      {
        place: '2nd',
        point: '7',
        iconCup: true,
      },
      {
        place: '3rd',
        point: '6',
        iconCup: true,
      },
      {
        place: '4th',
        point: '5',
      },
      {
        place: '5th',
        point: '4',
      },
      {
        place: '6th',
        point: '3',
      },
      {
        place: '7th',
        point: '2',
      },
      {
        place: '8th',
        point: '1',
      },
    ],
  })),
)

export default container
