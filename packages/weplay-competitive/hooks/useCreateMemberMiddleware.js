import { useEffect } from 'react'

import useAction from 'weplay-core/helpers/useAction'
import { axios } from 'weplay-core/services/axios'
import config from 'weplay-core/config'

import { membersActions } from 'weplay-competitive/reduxs/members'
import { STATUS_CODES } from 'weplay-competitive/constants/statusCodes'

export const useCreateMemberMiddleware = () => {
  const { getMemberById } = useAction({ getMemberById: membersActions.findRecord.request })
  const { createMember } = useAction({ createMember: membersActions.createRecord.request })

  useEffect(() => {
    const interceptorId = axios.interceptors.response.use((response) => {
      const { config: { url } } = response

      const isBaseAuthRequest = url.includes(`${config.authApi.url}/v1/users/create`)
      const isSocialAuthRequest = url.includes(`${config.authApi.url}/v1/social`)

      if (isBaseAuthRequest || isSocialAuthRequest) {
        const id = response.data.data.id
        getMemberById({ id })
          .catch((err) => {
            if (err.error.status === STATUS_CODES.NOT_FOUND) {
              createMember()
            }
          })
      }
      return response
    }, error => Promise.reject(error))
    return () => axios.interceptors.response.eject(interceptorId)
  }, [])
  return null
}
