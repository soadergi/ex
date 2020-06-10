import { CHALLONGE_STATUSES } from '../../constants/challongeStatuses'

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
    filter: record => record.state === CHALLONGE_STATUSES.UNDERWAY || record.state === CHALLONGE_STATUSES.PENDING,
  },
  {
    id: TABS_IDS.PAST,
    title: t('competitive.tournaments.tournamentsTable.tabs.past'),
    query: TABS_IDS.PAST,
    filter: record => record.state === CHALLONGE_STATUSES.COMPLETE,
  },
]
