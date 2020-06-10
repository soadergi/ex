import config from 'weplay-core/config'
import { trimObjectStringKeys } from 'weplay-core/helpers/trimObjectStringKeys'
import { axios } from 'weplay-core/services/axios'

export const validateUserNickNameRequest = ({
  nickname,
}) => axios.post(`${config.UMSApi.url}/v1/users/validate-nickname`, trimObjectStringKeys({ nickname }))

export const generateChangeEmailCodeRequest = ({
  params,
}) => axios.post(`${config.authApi.url}/v1/codes/generate-change-email-code`, (trimObjectStringKeys(params)))

export const changeEmailRequest = ({
  params,
}) => axios.post(`${config.UMSApi.url}/v1/users/change-email`, (trimObjectStringKeys(params)))
