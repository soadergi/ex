import {
  compose,
  withStateHandlers,
  withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

const initialMods = ['inverted', 'teamsList']

const container = compose(
  connect(createStructuredSelector({
  }), {
  }),

  withStateHandlers(({ activePlayerIndex = 0, sortedPlayers }) => ({
    activePlayer: sortedPlayers[activePlayerIndex],
  }), {
    setActivePlayer: () => player => ({
      activePlayer: player,
    }),
  }),

  withHandlers({
    getPlayerModifiers: ({
      activePlayer,
    }) => (player) => {
      const extraMods = []

      if (player.isCaptain) {
        extraMods.push('isCaptain')
      }

      if (player.uuid === activePlayer.uuid) {
        extraMods.push('isActive')
      }

      return initialMods.concat(extraMods)
    },
  }),
)

export default container
