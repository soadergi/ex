import _ from 'lodash'
import * as R from 'ramda'

import { TOURNAMENT_BRACKETS } from 'weplay-competitive/constants/tournamentBrackets'
import { TOURNAMENT_STATUSES } from 'weplay-competitive/constants/tournamentStatuses'

const renameKeysWith = renameField => (object) => {
  const newObject = {}
  Object.keys(object).forEach((key) => {
    newObject[renameField(key)] = object[key]
  })
  return newObject
}

export const DEFAULT_QUERY_VALUES = {
  FILTERS: 'any',
  OFFSET: 0,
  LIMIT: 10,
}

// TODO: @illia check values with backend
const BRACKETS = [
  DEFAULT_QUERY_VALUES.FILTERS,
  ...R.values(TOURNAMENT_BRACKETS),
]

const NO_EMPTY_SLOSTS = 'NO_EMPTY_SLOSTS'
const EMPTY_SLOTS_OPTIONS = [
  DEFAULT_QUERY_VALUES.FILTERS,
  'gt:0',
]

export const TABS_IDS = {
  ACTIVE: 'active',
  PAST: 'past',
}

const STATUSES_ACCORDING_TO_TAB = {
  [TABS_IDS.ACTIVE]: [DEFAULT_QUERY_VALUES.FILTERS, TOURNAMENT_STATUSES.ONGOING, TOURNAMENT_STATUSES.UPCOMING],
  [TABS_IDS.PAST]: [DEFAULT_QUERY_VALUES.FILTERS, TOURNAMENT_STATUSES.ENDED, TOURNAMENT_STATUSES.CANCELED],
}

export const getInitialFilters = R.pipe(
  R.prop('filterConfigs'),
  R.reduce((initialFilters, filterConfig) => ({
    ...initialFilters,
    [filterConfig.fieldLabel]: filterConfig.initialValue,
  }), {}),
)

const toQueryStringParam = param => param.toString().toLowerCase().split(' ').join('-')

export const getTabs = t => [
  {
    id: TABS_IDS.ACTIVE,
    title: t('competitive.tournaments.tournamentsTable.tabs.active'),
    query: '',
    filter: `${TOURNAMENT_STATUSES.UPCOMING},${TOURNAMENT_STATUSES.ONGOING}`,
  },
  {
    id: TABS_IDS.PAST,
    title: t('competitive.tournaments.tournamentsTable.tabs.past'),
    query: TABS_IDS.PAST,
    filter: `${TOURNAMENT_STATUSES.ENDED}`,
  },
]

export const getFilterConfigs = ({
  t,
  gameModes,
  activeTab,
}) => [
  {
    fieldName: 'relationships.gameMode.id',
    initialValue: DEFAULT_QUERY_VALUES.FILTERS,
    isDisabled: false,
    fieldType: 'select',
    fieldLabel: 'gameMode',
    isAvailable: true,
    options: [
      {
        label: t('competitive.tournaments.tournamentsTable.filters.options.gameMode.any'),
        value: 'any',
        url: null,
      },
      ...gameModes
        .sort((a, b) => Number(a.size) - Number(b.size))
        .map(gameMode => ({
          label: gameMode.title,
          value: gameMode.id.toString(),
          url: toQueryStringParam(gameMode.id),
        })),
    ],
  },
  {
    fieldName: 'status',
    initialValue: DEFAULT_QUERY_VALUES.FILTERS,
    isDisabled: false,
    fieldLabel: 'status',
    fieldType: 'select',
    isAvailable: true,
    options: STATUSES_ACCORDING_TO_TAB[activeTab.id]
      .map(status => ({
        label: t(`competitive.tournaments.tournamentsTable.filters.options.status.${status}`),
        value: status,
        url: toQueryStringParam(status),
      })),
  },
  {
    fieldName: 'emptySlots',
    initialValue: DEFAULT_QUERY_VALUES.FILTERS,
    isDisabled: false,
    fieldLabel: 'emptySlots',
    fieldType: 'select',
    isAvailable: activeTab.id !== TABS_IDS.PAST,
    options: EMPTY_SLOTS_OPTIONS.map(value => ({
      label: t(`competitive.tournaments.tournamentsTable.filters.options.emptySlots.${value}`),
      value,
      url: toQueryStringParam(value),
    })),
  },
  {
    fieldName: 'bracket',
    initialValue: DEFAULT_QUERY_VALUES.FILTERS,
    isDisabled: true,
    fieldLabel: 'bracket',
    fieldType: 'select',
    isAvailable: true,
    options: BRACKETS.map(bracket => ({
      label: t(`competitive.tournaments.tournamentsTable.filters.options.brackets.${bracket}`),
      value: bracket,
      url: toQueryStringParam(bracket),
    })),
  },
]

export const mapFiltersToQueryParams = R.pipe(
  R.reject(R.equals(DEFAULT_QUERY_VALUES.FILTERS)),
  renameKeysWith(fieldName => (
    fieldName.includes('.')
      ? fieldName.split('.')[1]
      : fieldName
  )),
  R.evolve({
    emptySlots: R.ifElse(
      R.equals(NO_EMPTY_SLOSTS),
      R.always('field:total_slots'),
      R.identity,
    ),
  }),
  renameKeysWith(fieldName => `filter[${_.snakeCase(fieldName)}]`),
)
