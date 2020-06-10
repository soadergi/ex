import {
  compose,
  withStateHandlers,
  withPropsOnChange,
} from 'recompose'

const container = compose(
  withStateHandlers(({ isInitiallyExpanded }) => ({
    isExpanded: isInitiallyExpanded,
  }), {
    toggleExpanded: ({
      isExpanded,
    }) => () => ({
      isExpanded: !isExpanded,
    }),
  }),

  withPropsOnChange([
    'player',
  ], ({
    player,
  }) => ({
    isPlayerToggleVisible: Boolean(player.name || player.team),
  })),
)

export default container
