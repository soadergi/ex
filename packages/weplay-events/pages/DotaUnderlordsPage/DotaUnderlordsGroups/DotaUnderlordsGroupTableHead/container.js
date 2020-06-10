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

  withProps({
    tableHeaders: [
      {
        id: 0,
        label: '',
      },
      {
        id: 1,
        label: '1',
      },
      {
        id: 2,
        label: '2',
      },
      {
        id: 3,
        label: '3',
      },
      {
        id: 4,
        label: '4',
      },
      {
        id: 5,
        label: '5',
      },
      {
        id: 6,
        label: '6',
      },
      {
        id: 7,
        label: '7',
      },
      {
        id: 8,
        label: '8',
      },
      {
        id: 9,
        label: '9',
      },
      {
        id: 10,
        label: '10',
      },
      {
        id: 11,
        label: 'RD',
      },
      {
        id: 12,
        label: 'NW',
      },
    ],
  }),
)

export default container
