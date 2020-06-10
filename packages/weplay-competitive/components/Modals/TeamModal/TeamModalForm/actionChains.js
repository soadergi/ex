import * as R from 'ramda'

import { teamsActions, teamsSelectors } from 'weplay-competitive/reduxs/teams'

export const createOrUpdateTeamAndSetErrors = ({
  setErrors,
  setSubmitting,
  onSuccess,
  team,
}) => (dispatch, getState) => {
  setErrors({})

  return teamsActions[team.data.id ? 'updateRecord' : 'createRecord'].request(team)(dispatch, getState)
    .then(
      R.path(['data', 'id']),
      () => {
        const state = getState()
        const createTeamFieldsError = teamsSelectors.createFieldsErrorSelector(state)
        const updateTeamFieldsError = teamsSelectors.updateFieldsErrorSelector(state)
        setErrors({
          ...createTeamFieldsError,
          ...updateTeamFieldsError,
        })
        return Promise.reject()
      },
    )
    .then(onSuccess)
    .catch(() => setSubmitting(false))
    .finally(() => setSubmitting(false))
}
