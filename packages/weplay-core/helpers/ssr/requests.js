import getIsServer from './getIsNext'

const requests = {

}

export const getRequest = (key) => {
  const request = requests[key]
  if (request) {
    return request
  }
  if (getIsServer()) {
    console.log('no request for key, this should be visible only on client')
  }
  return null
}

export const setRequest = (request) => {
  const requestKey = Math.random()
  requests[requestKey] = request
  return requestKey
}

// TODO: trigger it when connection closed?
export const clearRequest = (requestKey) => {
  delete requests[requestKey]
}
