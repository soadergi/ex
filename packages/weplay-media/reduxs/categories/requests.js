import config from 'weplay-core/config'
import { prepareRequestData } from 'weplay-core/reduxs/helpers'
import { axios } from 'weplay-core/services/axios'

const CATEGORIES_URL = `${config.tagsApi.url}/categories`

export const getCategoryRequest = ({ title }) => axios
  .get(`${CATEGORIES_URL}/${title}`)
  .then(prepareRequestData)
