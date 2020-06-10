import { LADDER_STATUSES } from 'weplay-competitive/constants/ladderStatuses'

export const TABS_IDS = {
  ACTIVE: 'active',
  PAST: 'past',
}

export const DEFAULT_QUERY_VALUES = {
  OFFSET: 0,
  LIMIT: 10,
}

export const getTabs = t => [
  {
    id: TABS_IDS.ACTIVE,
    title: t('competitive.tournaments.tournamentsTable.tabs.active'),
    query: '',
    filter: `${LADDER_STATUSES.ONGOING},${LADDER_STATUSES.UPCOMING}`,
    sort: 'start_date',
  },
  {
    id: TABS_IDS.PAST,
    title: t('competitive.tournaments.tournamentsTable.tabs.past'),
    query: TABS_IDS.PAST,
    filter: `${LADDER_STATUSES.FINISHED}`,
    sort: '-start_date',
  },
]
