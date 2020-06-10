import { signIn, updateUser } from 'weplay-core/reduxs/_legacy/auth/actions'
import { createVote } from 'weplay-core/reduxs/votingOptions/actions'
import afterLoginAction from 'weplay-core/helpers/afterLoginAction'

const signInWithParams = ({ values, params }) => (dispatch, getState) => signIn({
  body: {
    password: values.password,
    email: values.email,
  },
}, {
  headers: {
    'Content-Type': 'application/json',
  },
  params,
})(dispatch, getState)

export const loginAndPatchUser = ({
  values,
  body,
  params,
}) => (dispatch, getState) => signInWithParams({
  values,
  params,
})(dispatch, getState).then(() => updateUser({
  body,
}, {
  headers: {
    'Content-Type': 'application/json',
  },
})(dispatch, getState))

const postVote = (dispatch, getState) => params => createVote.request(params)(dispatch, getState)

export const loginAndRedirectToPrevPage = ({
  values,
  params,
  history,
  closePopup,
}) => (dispatch, getState) => signInWithParams({ values, params })(dispatch, getState).then(() => {
  afterLoginAction(history, postVote(dispatch, getState), closePopup)
})
