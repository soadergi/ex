import { useDispatch, useSelector } from 'react-redux'

import { useParams } from 'weplay-singleton/RouterProvider/useParams'
import { useHistory } from 'weplay-singleton/RouterProvider/useHistory'

import { currentUserSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

import { membersActions } from 'weplay-competitive/reduxs/members'

export const useHandleMemberNotFound = () => {
  const currentUser = useSelector(currentUserSelector)

  const { memberId } = useParams()

  const dispatch = useDispatch()
  const createMemberAction = membersActions.createRecord.request()
  const history = useHistory()

  const isOwner = currentUser?.id === Number(memberId)

  return () => {
    if (isOwner) {
      return dispatch(createMemberAction)
    }
    return history.replace('/not-found')
  }
}
