import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  compose,
  lifecycle,
  withHandlers,
  withState,
  branch,
  renderNothing,
} from 'recompose'
import queryString from 'query-string'

import { currentLanguageSelector } from 'weplay-core/reduxs/language/reducer'
import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'
import withAnalytics from 'weplay-core/HOCs/withAnalytics'
import { axios } from 'weplay-core/services/axios'
import {
  isLoggedInSelector,
  userIdSelector,
} from 'weplay-core/reduxs/_legacy/auth/reducer'
import { SUB_API_ACTIONS } from 'weplay-core/consts/subApiActions'

import { membersActions } from 'weplay-competitive/reduxs/members'
import { currentMemberSelector } from 'weplay-competitive/reduxs/members/selectors'
import { featuresActions } from 'weplay-competitive/reduxs/features'
import withFeatureSupport from 'weplay-competitive/HOCs/withFeatureSupport'
import { userPenaltiesActions } from 'weplay-competitive/reduxs/userPenalties'

const container = compose(
  withFeatureSupport,
  connect(createStructuredSelector({
    globalScope: globalScopeSelector,
    isLoggedIn: isLoggedInSelector,
    currentLanguage: currentLanguageSelector,
    currentUserId: userIdSelector,
    currentMember: currentMemberSelector,
  }), {
    queryMember: membersActions.findRecord.request,
    queryFeatures: featuresActions.queryRecords.request,
    clearFeatures: featuresActions.clearRecords,
    getUserPenalties: userPenaltiesActions.queryRecords.request,
  }),
  withAnalytics,
  withState('isFeaturesHandled', 'setFeaturesHandled', false),
  withState('isSLTHandled', 'setSLTHandled', false),
  lifecycle({
    componentDidMount() {
      const {
        setSLTHandled,
        location,
        queryFeatures,
        setFeaturesHandled,
      } = this.props

      queryFeatures()
        .finally(() => setFeaturesHandled(true))

      const { lkt } = queryString.parse(location.search)
      // LKT - license key token (short live in this case)
      // SLT - short live token
      if (lkt) {
        axios
          // this request sets cookie to client, identifying that this user came from Enestech if succeeded
          .get('/licensor-service/v1/license', { params: { slt: lkt } })
          .finally(() => setSLTHandled(true))
      } else {
        setSLTHandled(true)
      }
    },
  }),
  branch(
    ({ isFeaturesHandled, isSLTHandled }) => !isFeaturesHandled || !isSLTHandled,
    renderNothing,
  ),
  withState('activeAlertModalType', 'setActiveAlertModalType', ''),
  withHandlers({
    hideAlertModal: ({
      setActiveAlertModalType,
    }) => () => setActiveAlertModalType(''),
  }),

  withHandlers({
    handleAmplitudeProperties: ({
      currentUserId,
      currentMember,
      setAmplitudeUserId,
      setAmplitudeCustomProperty,
    }) => () => {
      setAmplitudeUserId(`${currentUserId}`)
      if (currentMember.isFetched) {
        setAmplitudeCustomProperty({
          'Steam Connected': Boolean(currentMember?.user?.steamId),
        })
      }
    },
  }),

  withHandlers({
    handleUserChange: ({
      queryMember,
      currentUserId,
      handleAmplitudeProperties,
      getUserPenalties,
    }) => () => {
      queryMember({ id: currentUserId, included: 'team_members,tournament_members' })
      handleAmplitudeProperties()
      getUserPenalties({
        subApiAction: SUB_API_ACTIONS.ME,
      })
    },
  }),

  lifecycle({
    componentDidMount() {
      const userId = this.props.currentUserId
      if (userId) {
        this.props.handleUserChange()
      }
    },
    componentDidUpdate(prevProps) {
      const {
        isLoggedIn,
        currentUserId,
        queryFeatures,
        handleUserChange,
      } = this.props
      if (isLoggedIn !== prevProps.isLoggedIn) {
        if (currentUserId) {
          queryFeatures()
            .then(handleUserChange)
        } else {
          queryFeatures()
        }
      }
    },
  }),
)

export default container
