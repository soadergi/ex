import * as R from 'ramda'
import { createStructuredSelector } from 'reselect'
import {
  compose,
  lifecycle,
  withHandlers,
  withProps,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import {
  isLoggedInSelector,
  userIdSelector,
} from 'weplay-core/reduxs/_legacy/auth/reducer'
import { NAMES, goTo } from 'weplay-core/routes'
import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'
import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'
import withScrollAnalytics from 'weplay-core/HOCs/withScrollAnalytics'

import { membersActions } from 'weplay-competitive/reduxs/members'
import { currentMemberSelector } from 'weplay-competitive/reduxs/members/selectors'
import { defaultDisciplineSelector } from 'weplay-competitive/reduxs/defaultDiscipline/reducer'
import { DISCIPLINES } from 'weplay-competitive/config/disciplines'

const container = compose(
  withScrollAnalytics,
  withRouter,
  connect(createStructuredSelector({
    // selectors
    globalScope: globalScopeSelector,
    isLoggedIn: isLoggedInSelector,
    currentUserId: userIdSelector,
    currentMember: currentMemberSelector,
    defaultDiscipline: defaultDisciplineSelector,
  }), {
    // actionCreators
    createMember: membersActions.createRecord.request,
  }),
  withPageViewAnalytics(),
  withProps({
    ogImage: 'https://static-prod.weplay.tv/og_tag_ru.jpg',
    disciplines: R.values(DISCIPLINES),
  }),
  withPropsOnChange([
    'currentMember',
    'defaultDiscipline',
  ], ({
    currentMember,
    defaultDiscipline,
  }) => ({
    disciplineName: currentMember.id === defaultDiscipline.memberId
      ? defaultDiscipline.name
      : R.pipe(
        R.keys,
        R.head,
      )(DISCIPLINES),
  })),

  withHandlers({
    redirectToDefaultDiscipline: ({
      history,
      location,
      disciplineName,
    }) => () => {
      goTo({
        history,
        name: NAMES.TOURNAMENTS,
        params: {
          discipline: disciplineName,
        },
        method: 'replace',
        search: location.search,
      })
    },
  }),

  lifecycle({
    componentDidMount() {
      if (this.props.currentMember.isFetched) {
        this.props.redirectToDefaultDiscipline()
      }
    },
    componentDidUpdate(prevProps) {
      if (this.props.isLoggedIn && this.props.currentMember && this.props.currentMember.isFetched
          && prevProps.currentMember !== this.props.currentMember) {
        this.props.redirectToDefaultDiscipline()
      }
    },
  }),

  withHandlers({
    handleDisciplineClick: ({ createMember, isLoggedIn, currentMember }) => () => {
      if (isLoggedIn && !currentMember.isFetched) {
        createMember()
      }
    },
  }),
)

export default container
