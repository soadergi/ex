import {
  compose,
  withHandlers,
  withPropsOnChange,
  withState,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    globalScope: globalScopeSelector,
  }), {
    // actionCreators
  }),
  // ============= DUPLICATED ========
  withPropsOnChange([
    'rounds',
  ], ({
    rounds,
  }) => {
    const { doubleRoundIndexes } = rounds.reduce((accumulator, round, index) => {
      if (round.games.length === accumulator.prevRoundGamesLenght) {
        return {
          doubleRoundIndexes: accumulator.doubleRoundIndexes.concat(index),
          prevRoundGamesLenght: round.games.length,
        }
      }
      return {
        ...accumulator,
        prevRoundGamesLenght: round.games.length,
      }
    }, {
      doubleRoundIndexes: [],
      prevRoundGamesLenght: 0,
    })
    return ({
      doubleRoundIndexes,
      lastRoundIndex: rounds.length - 1,
    })
  }),
  // ============= DUPLICATED ========
  withState('hoveredParticipantId', 'setHoveredParticipantId', null),
  withPropsOnChange([
    'hoveredParticipantId',
    'setHoveredParticipantId',
  ], ({
    hoveredParticipantId,
    setHoveredParticipantId,
  }) => ({
    participantContext: {
      hoveredParticipantId,
      setHoveredParticipantId,
    },
  })),
  withState('isMouseDown', 'toggleMouseDown', false),

  withHandlers(() => {
    let bracketsGrid
    let startX
    let startY
    let scrollLeft
    let scrollTop
    return {
      createInnerRef: () => (el) => { bracketsGrid = el },
      mouseDownHandler: ({ toggleMouseDown, globalScope }) => (e) => {
        toggleMouseDown(true)
        startX = e.pageX - bracketsGrid.offsetLeft
        startY = e.pageY - globalScope.pageYOffset
        scrollLeft = bracketsGrid.scrollLeft
        scrollTop = globalScope.pageYOffset
      },
      mouseLeaveHandler: ({ toggleMouseDown }) => () => {
        toggleMouseDown(false)
      },
      mouseUpHandler: ({ toggleMouseDown }) => () => {
        toggleMouseDown(false)
      },
      mouseMoveHandler: ({ isMouseDown, globalScope, handleHeaderPosition }) => (e) => {
        if (!isMouseDown) return
        const x = e.pageX - bracketsGrid.offsetLeft
        const y = e.pageY - globalScope.pageYOffset
        const deltaX = (x - startX) * 2
        const deltaY = (y - startY) * 2
        bracketsGrid.scrollLeft = scrollLeft - deltaX
        globalScope.scrollTo({
          top: scrollTop - deltaY,
        })
        handleHeaderPosition(scrollLeft - deltaX)
      },
      scrollHandler: ({ handleHeaderPosition }) => () => {
        handleHeaderPosition(bracketsGrid.scrollLeft)
      },
    }
  }),
)

export default container
