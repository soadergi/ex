import {
  compose,
  withHandlers,
  withPropsOnChange,
  withState,
  branch,
  renderNothing,
  withProps,
} from 'recompose'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

const INITIAL_PRIZE_SHOW = 3
const TOURNAMENT_PLACES = {
  FIRST_PLACE: 1,
  SECOND_PLACE: 2,
  THIRD_PLACE: 3,
}

const container = compose(
  withLocale,
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
  }),
  withProps(() => ({
    minPrizesCountForSpoiler: 6,
  })),

  withState('isOpen', 'setOpen', false),
  withHandlers({
    clickHandler: ({ isOpen, setOpen }) => () => {
      setOpen(!isOpen)
    },
  }),

  withPropsOnChange([
    'totalRewards',
    'distributedRewards',
    'currentTournament',
  ], ({
    totalRewards,
    distributedRewards,
    currentTournament,
  }) => {
    const countParticipants = currentTournament.totalSlots - currentTournament.emptySlots
    const currentMilestoneId = R.pipe(
      R.find(
        item => R.allPass([
          () => R.prop('maxPosition', item) >= countParticipants,
          () => R.prop('minPosition', item) <= countParticipants,
        ])(item),
      ),
      R.prop('id'),
    )(totalRewards)
    return {
      filteredDistributedRewards: R.filter(
        R.pathEq(['relationships', 'parentReward', 'id'], currentMilestoneId),
      )(distributedRewards),
    }
  }),

  withPropsOnChange([
    'filteredDistributedRewards',
    't',
  ], ({
    filteredDistributedRewards,
    t,
  }) => ({
    prizes: R.map(
      (item) => {
        const amountUsd = parseFloat(R.prop('amountUsd', item)) > 0
          ? `$${parseFloat(R.prop('amountUsd', item))}`
          : ''
        const amountWp = parseFloat(R.prop('amountWp', item)) > 0
          ? `${parseFloat(R.prop('amountWp', item))}WP`
          : ''
        let text
        switch (item.maxPosition) {
          case TOURNAMENT_PLACES.FIRST_PLACE:
            text = t('competitive.tournament.prizePool.firstPlace')
            break
          case TOURNAMENT_PLACES.SECOND_PLACE:
            text = t('competitive.tournament.prizePool.secondPlace')
            break
          case TOURNAMENT_PLACES.THIRD_PLACE:
            text = t('competitive.tournament.prizePool.thirdPlace')
            break
          default:
            text = item.maxPosition === item.minPosition
              ? item.maxPosition
              : `${item.minPosition}-${item.maxPosition}`
        }
        return {
          value: `${amountUsd}${(amountUsd && amountWp) ? ' + ' : ' '}${amountWp}`,
          text,
        }
      },
    )(filteredDistributedRewards),
  })),

  withPropsOnChange([
    'prizes',
    'isOpen',
    'minPrizesCountForSpoiler',
  ], ({
    prizes,
    isOpen,
    minPrizesCountForSpoiler,
  }) => {
    const slicedPrizes = isOpen ? prizes : prizes.slice(0, INITIAL_PRIZE_SHOW)
    return {
      prizesRecords: prizes.length <= minPrizesCountForSpoiler ? prizes : slicedPrizes,
    }
  }),

  branch(
    ({ prizes }) => !prizes.length,
    renderNothing,
  ),
)

export default container
