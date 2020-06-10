import * as R from 'ramda'
import {
  compose,
  withHandlers,
  withPropsOnChange,
} from 'recompose'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import transliterate from 'weplay-core/helpers/translit'
import withMoment from 'weplay-core/HOCs/withMoment'
import {
} from 'weplay-core/reduxs/language/reducer'
import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'
import withAnalytics from 'weplay-core/HOCs/withAnalytics'

import { gameModesSelectors } from 'weplay-competitive/reduxs/gameModes'
import { organizersSelectors } from 'weplay-competitive/reduxs/organizers'
import { tournamentsSelectors } from 'weplay-competitive/reduxs/tournaments'
import {
  GA__TOP_NOTCH_IMAGE,
  GA__REGULAR_CARD_IMAGE,
  GA__TOP_NOTCH_ORGANIZER,
  GA__TOP_NOTCH_LINK,
  GA__REGULAR_CARD_LINK,
} from 'weplay-competitive/analytics'
import { DISCIPLINES } from 'weplay-competitive/config/disciplines'
import { ACCESS_TYPES } from 'weplay-competitive/constants/accessTypes'

const container = compose(
  withAnalytics,
  connect(createStructuredSelector({
    getGameModeById: gameModesSelectors.getRecordByIdSelector,
    getOrganizerModeById: organizersSelectors.getRecordByIdSelector,
    pagination: tournamentsSelectors.paginationSelector,
  })),
  withPropsOnChange([
    'tournament',
    'getGameModeById',
  ], ({
    tournament,
    getGameModeById,
  }) => ({
    gameMode: getGameModeById(tournament.relationships.gameMode.id),
    gameId: tournament.relationships.game.id,
  })),
  withPropsOnChange([
    'gameId',
  ], ({
    gameId,
  }) => ({
    discipline: R.pipe(
      R.values,
      R.find(R.propEq('id', gameId)),
      R.prop('url'),
    )(DISCIPLINES),
  })),
  withPropsOnChange([
    'tournament',
    'getOrganizerModeById',
  ], ({
    tournament,
    getOrganizerModeById,
  }) => ({
    organizer: getOrganizerModeById(tournament?.relationships?.organizer?.id),
  })),
  withPropsOnChange([
    'tournament',
    'discipline',
  ], ({
    tournament,
    discipline,
  }) => ({
    tournamentUrl: pathWithParamsByRoute(
      NAMES.TOURNAMENT,
      {
        tournamentId: tournament.id,
        tournamentName: transliterate(tournament.name),
        discipline,
      },
    ),
  })),
  withMoment,
  withPropsOnChange([
    'tournament',
    'moment',
  ], ({
    tournament,
    moment,
  }) => {
    if (tournament.status !== 'UPCOMING') {
      return {
        subStatus: '',
      }
    }
    let subStatus = ''
    if (moment().isAfter(tournament.closeRegistrationDatetime)) {
      subStatus = 'registrationClosed'
    } else if (
      moment().isAfter(tournament.openRegistrationDatetime)
        && moment().isBefore(tournament.closeRegistrationDatetime)
    ) {
      subStatus = 'registrationOpen'
    }

    return ({
      subStatus,
    })
  }),
  withPropsOnChange([
    'tournament',
  ], ({
    tournament,
  }) => {
    switch (tournament.accessType) {
      case ACCESS_TYPES.ACCESS_BY_NAME:
        return {
          accessIcon: 'profile',
        }
      case ACCESS_TYPES.ACCESS_BY_LINK:
        return {
          accessIcon: 'invite',
        }
      case ACCESS_TYPES.ACCESS_PUBLIC:
        return {
          accessIcon: 'unlock',
        }
      case ACCESS_TYPES.ACCESS_BY_PREMIUM:
        return {
          accessIcon: 'premium',
        }
      default:
        return {
          accessIcon: '',
        }
    }
  }),

  withPropsOnChange([
    'pagination',
    'startcasePageName',
  ], ({
    pagination,
    startcasePageName,
  }) => {
    let page = ''
    let source = ''
    switch (startcasePageName) {
      case NAMES.TOURNAMENTS:
        page = String((pagination.offset / pagination.limit))
        source = 'Tournaments list'
        break
      case NAMES.TEAM:
        source = 'Team profile'
        break
      case NAMES.MEMBER:
        source = 'User profile'
        break
      default:
        page = 'none'
        source = ''
    }
    return { page, source }
  }),
  withHandlers({
    handleClickTopNotchOrganizer: ({ logAnalytics }) => () => logAnalytics(GA__TOP_NOTCH_ORGANIZER),
    handleClickTopNotchImage: ({ logAnalytics }) => () => logAnalytics(GA__TOP_NOTCH_IMAGE),
    handleClickRegularCardImage: ({ logAnalytics }) => () => logAnalytics(GA__REGULAR_CARD_IMAGE),
    handleClickTopNotchLink: ({ logAnalytics }) => () => logAnalytics(GA__TOP_NOTCH_LINK),
    handleClickRegularCardLink: ({ logAnalytics }) => () => logAnalytics(GA__REGULAR_CARD_LINK),
  }),
)

export default container
