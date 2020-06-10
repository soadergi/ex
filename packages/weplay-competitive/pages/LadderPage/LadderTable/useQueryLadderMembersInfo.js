import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import useAction from 'weplay-core/helpers/useAction'

import { currentMemberSelector } from 'weplay-competitive/reduxs/members/selectors'
import { memberInfoActions } from 'weplay-competitive/reduxs/memberInfoV3'

import { useLadderMembersIds } from './useLadderMembersIds'

export const useQueryLadderMembersInfo = () => {
  const currentMember = useSelector(currentMemberSelector)

  const { queryMembersInfo } = useAction({
    queryMembersInfo: memberInfoActions.queryRecords.request,
  })

  const membersIds = useLadderMembersIds()

  useEffect(() => {
    if (membersIds.length) {
      let filterIds = membersIds
      if (currentMember.isFetched) {
        filterIds = [...membersIds, currentMember.id]
      }
      queryMembersInfo({
        filter__id__in: filterIds.join(','),
      })
    }
  }, [membersIds, currentMember])
}
