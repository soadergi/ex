import {
  compose,
  withProps,
  withHandlers,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

const container = compose(
  connect(createStructuredSelector({
  }), {
  }),
  withProps(({
    isWinner,
    isThirdPlaceMatch,
    isFinalMatch,
    isGameFinished,
  }) => {
    const iconThirdPlace = isWinner ? 'bronzeCup' : 'emptyCup'
    const iconWinner = isWinner ? 'goldCup' : 'silverCup'

    return {
      winnerIconBlock: isFinalMatch && isGameFinished,
      iconName: isThirdPlaceMatch ? iconThirdPlace : iconWinner,
    }
  }),
  withHandlers({
    handleMouseEnter: ({
      setHoveredParticipantId,
      participant: { id },
    }) => () => {
      setHoveredParticipantId(id)
    },
    handleMouseLeave: ({
      setHoveredParticipantId,
    }) => () => {
      setHoveredParticipantId('')
    },
  }),
  withPropsOnChange([
    'participant',
    'hoveredParticipantId',
  ], ({
    participant,
    hoveredParticipantId,
  }) => ({
    isHovered: Boolean(hoveredParticipantId) && participant.id === hoveredParticipantId,
  })),
  withPropsOnChange([
    'isMatchTechnicalEnded',
    'isWinner',
  ], ({
    isMatchTechnicalEnded,
    isWinner,
  }) => ({
    isTechnicalDefeated: isMatchTechnicalEnded && !isWinner,
  })),
)

export default container
