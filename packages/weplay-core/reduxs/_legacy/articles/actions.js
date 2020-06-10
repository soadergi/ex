import config from '../../../config'
import {
  createRequestTypes,
  createRequestFunc,
} from '../reduxHelpers'

const GET_ARTICLES = createRequestTypes('ARTICLES/GET')
const GET_MORE_ARTICLES = createRequestTypes('GET_MORE_ARTICLES/GET')

const getArticles = createRequestFunc(GET_ARTICLES, 'get', `${config.mediaApi.url}/news`)
const getMoreArticles = createRequestFunc(GET_MORE_ARTICLES, 'get', `${config.mediaApi.url}/news`)

export {
  GET_ARTICLES,
  GET_MORE_ARTICLES,
  getArticles,
  getMoreArticles,
}
