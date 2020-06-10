import originalAxios from 'axios'

export const axios = originalAxios.create()
export const sameBaseAxios = originalAxios.create({
  baseURL: '',
})
export const configureApiHost = (apiHost) => {
  originalAxios.defaults.withCredentials = true
  originalAxios.defaults.baseURL = apiHost
}

export const configureAcceptLang = (language) => {
  axios.defaults.headers.common['Accept-Language'] = language
}
