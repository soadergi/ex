import _ from 'lodash'
import * as R from 'ramda'
import { createSelector } from 'reselect'
import { combineReducers } from 'redux'

import { createRequestSelectors } from 'weplay-core/reduxs/_factories/request/createRequestSelectors'
import { createRequestReducer } from 'weplay-core/reduxs/_factories/request/createRequestReducer'
import { currentLanguageSelector } from 'weplay-core/reduxs/language/reducer'
import { arrayToMapById, localizeWith } from 'weplay-core/reduxs/helpers'

import { readVotingOptions, createVote, readVotingOption } from './actions'

export const VOTING_OPTIONS_RN = 'VOTING_OPTIONS'
const READ_VOTING_OPTIONS_RN = 'READ_VOTING_OPTIONS'
const CREATE_VOTE_RN = 'CREATE_VOTE'
const READ_VOTING_OPTION_RN = 'READ_VOTING_OPTION'

// TODO: make from this factory
export default combineReducers({
  [READ_VOTING_OPTIONS_RN]: createRequestReducer(readVotingOptions, {
    [readVotingOptions.SUCCESS]: (state, { payload }) => {
      const id = R.pathOr(0, ['0', 'votingId'], payload)

      return ({
        ...state,
        data: {
          ...state.data,
          [id]: arrayToMapById(payload),
        },
        loading: false,
      })
    },
    [createVote.SUCCESS]: (state, { payload }) => ({
      ...state,
      data: {
        ...state.data,
        [payload.votingId]: R.mapObjIndexed(votingOption => ({
          ...votingOption,
          nextVoteDatetime: payload.nextVoteDatetime,
          votesCount: votingOption.id === payload.id ? payload.votesCount : votingOption.votesCount,
        }), state.data[payload.votingId]),
      },
    }),
    [readVotingOption.SUCCESS]: (state, { payload }) => ({
      ...state,
      data: {
        ...state.data,
        [payload.id]: {
          ...payload,
        },
      },
    }),
  }),
  [CREATE_VOTE_RN]: createRequestReducer(createVote),
  [READ_VOTING_OPTION_RN]: createRequestReducer(readVotingOption),
})

const optionsAsyncSelectors = createRequestSelectors([VOTING_OPTIONS_RN, READ_VOTING_OPTIONS_RN])

export const votingOptionsHashSelector = createSelector(
  [optionsAsyncSelectors.dataSelector],
  R.defaultTo({}),
)

export const votingOptionsLoadingSelector = optionsAsyncSelectors.loadingSelector

export const votingOptionsByIdSelector = votingOptionsId => createSelector(
  [votingOptionsHashSelector, currentLanguageSelector],
  (votingOptionsHash, currentLanguage) => R.pipe(
    R.propOr([], votingOptionsId),
    R.values,
    R.map(localizeWith(currentLanguage)),
  )(votingOptionsHash),
)

export const votingOptionsByIdBestCandidateSelector = votingOptionsId => createSelector(
  [votingOptionsByIdSelector(votingOptionsId)],
  votingOptions => R.pipe(
    R.sort(R.descend(R.prop('votesCount'))),
    candidates => candidates[0] || {},
  )(votingOptions),
)

export const optionsByIdSelector = mapPropsToVotingId => createSelector(
  [
    votingOptionsHashSelector,
    currentLanguageSelector,
    (state, props) => mapPropsToVotingId(props),
  ],
  (votingOptionsHash, currentLanguage, votingId) => R.pipe(
    R.propOr([], votingId),
    R.values,
    R.map(localizeWith(currentLanguage)),
    R.sortWith([R.ascend(R.prop('_indexInArray'))]),
  )(votingOptionsHash),
)

// TODO: in future we should have separate reducer for votings and for voting options
// and this selector will depend on votingId (always 1 now)
export const areOptionsFetchedSelector = createSelector(
  [optionsByIdSelector(() => '1')],
  votingOptions => !_.isEmpty(votingOptions),
)

export const nearbyOptionIdsSelector = createSelector(
  [optionsByIdSelector(() => '1'), (state, props) => props.votingOptionId],
  (votingOptions, votingOptionId) => {
    const indexOfCurrentOption = votingOptions.findIndex(option => option.id === votingOptionId)
    return {
      prevOptionId: _.get(votingOptions,
        [indexOfCurrentOption - 1, 'id']) || _.get(votingOptions, [votingOptions.length - 1, 'id']),
      nextOptionId: _.get(votingOptions,
        [indexOfCurrentOption + 1, 'id']) || _.get(votingOptions, [0, 'id']),
    }
  },
)

export const getOptionByIdSelector = createSelector(
  [
    votingOptionsHashSelector,
    currentLanguageSelector,
    (state, props) => props.votingOptionId,
    (state, props) => R.path(['match', 'params', 'votingId'], props),
  ],
  (votingOptionsHash, currentLanguage, votingOptionId, votingId) => R.pipe(
    R.propOr([], votingId),
    R.prop(votingOptionId),
    localizeWith(currentLanguage),
    R.defaultTo({}),
  )(votingOptionsHash),
)

export const optionCountrySelector = createSelector(
  [getOptionByIdSelector],
  R.propOr('', 'country'),
)
