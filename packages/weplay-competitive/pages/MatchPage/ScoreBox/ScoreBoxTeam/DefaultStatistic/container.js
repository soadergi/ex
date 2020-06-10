import {
  compose,
  withPropsOnChange,
} from 'recompose'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import { membersSelectors } from 'weplay-competitive/reduxs/members'
import { teamsSelectors } from 'weplay-competitive/reduxs/teams'

const container = compose(
  withLocale,
  connect(createStructuredSelector({
    //
    getMemberById: membersSelectors.getRecordByIdSelector,
    getTeamById: teamsSelectors.getRecordByIdSelector,
  }), {
    // actionCreators
  }),
  withPropsOnChange([
    'progress',
  ], ({
    progress,
  }) => ({
    rotateStyles: {
      // eslint-disable-next-line no-magic-numbers
      transform: `rotateZ(${180 * progress}deg)`,
      // eslint-disable-next-line no-magic-numbers
      WebkitTransform: `rotateZ(${180 * progress}deg)`,
    },
  })),
  withPropsOnChange([
    'team',
    'getTeamById',
    'getMemberById',
    'serverPick',
    'sideIndex',
  ], ({
    team,
    getTeamById,
    getMemberById,
    serverPick,
    t,
    sideIndex,
  }) => {
    let avatar = ''
    let name = ''
    let isPremiumAccount = false
    if (team.teamId) {
      const teamInfo = R.pipe(
        R.prop('teamId'),
        getTeamById,
      )(team)
      avatar = R.propOr('', 'avatar', teamInfo)
      name = R.propOr('', 'name', teamInfo)
    } else {
      const member = R.pipe(
        R.prop('memberId'),
        getMemberById,
      )(team.players[0])
      avatar = R.pathOr('', ['user', 'avatar'], member)
      name = R.pathOr('', ['user', 'nickname'], member)
      isPremiumAccount = R.pathOr(false, ['user', 'isPremiumAccount'], member)
    }

    const defaultStatisticData = {
      ...team,
      // TODO: @rbogdanov remove hardcode
      side: sideIndex === 0 ? 'Radiant' : 'Dire',
      userPick: team.pick ? t('competitive.scorebox.common.pickTitle') : '-',
      serverPick: serverPick ? t('competitive.scorebox.common.pickTitle') : '-',
    }
    return {
      avatar,
      name,
      defaultStatisticData,
      isPremiumAccount,
    }
  }),
)

export default container
