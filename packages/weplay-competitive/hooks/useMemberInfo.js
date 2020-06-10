import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import useAction from 'weplay-core/helpers/useAction'

import { memberInfoSelectors, memberInfoActions } from 'weplay-competitive/reduxs/memberInfoV3'

const useMemberInfo = (userId) => {
  const getMemberInfoById = useSelector(memberInfoSelectors.getRecordByIdSelector)
  const memberInfo = getMemberInfoById(userId)
  const { queryMemberInfo } = useAction({ queryMemberInfo: memberInfoActions.findRecord.request })

  useEffect(
    () => {
      if (!memberInfo?.isFetched) {
        queryMemberInfo({ id: userId })
      }
    },
    [],
  )

  return { memberInfo }
}

export default useMemberInfo
