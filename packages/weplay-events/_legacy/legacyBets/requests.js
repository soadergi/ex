// TODO: DANGER. LEGACY CODE. It doesn't work, not connected with redux and there're no any usages of it.
// Decided to keep it here in case of come back of some previous betting companies.
import * as R from 'ramda'

import { axios } from 'weplay-core/services/axios'
import { camelizeKeys } from 'weplay-core/reduxs/helpers'

const LOOT_BETS_URL = 'https://odds.loot.bet/api/sports.xml'

const BETS_URL = '/events-service/remote?u=https://part.upnp.xyz'
const ES_BETS_URL = '/events-service/remote?u=https://line.esportslab.tech'
const EGB_BETS_URL = '/events-service/remote?u=https://egb.com'
const EGB_BETS_TOKEN = '8c808a370b74765e3bab2bc04bcbebfee2122d836b56311e'
const createAdapter = (params = {}) => R.pipe(
  R.filter(R.propSatisfies(id => (params.gameBetIds ? params.gameBetIds.includes(id) : true), 'I')),
  camelizeKeys,
)

export const getOfflineBetsRequest = params => axios.get(`${BETS_URL}/PartLine/GetAllFeedGames?cyberFlag=1`)
  .then(response => response.data)
  .then(createAdapter(params))

export const getOnlineBetsRequest = params => axios.get(`${BETS_URL}/PartLive/GetAllFeedGames?cyberFlag=1`)
  .then(response => response.data)
  .then(createAdapter(params))

export const getEsBetsRequest = () => axios.get(`${ES_BETS_URL}/api/weplay/line?t=m9bW!vQWTm`)
  .then(R.prop('data'))

export const getEGBBetsRequest = () => axios.get(`${EGB_BETS_URL}/api/v1/bets_all?token=${EGB_BETS_TOKEN}`)
  .then(R.prop('data'))
  .then(camelizeKeys)

const MIN_SUCCESS_STATUS = 200
const MAX_SUCCESS_STATUS = 300

export const getLootBetRequest = () => new Promise((resolve, reject) => {
  const xhttp = new XMLHttpRequest()
  xhttp.open('GET', LOOT_BETS_URL, true)
  xhttp.onload = () => {
    if (xhttp.status >= MIN_SUCCESS_STATUS && xhttp.status < MAX_SUCCESS_STATUS) {
      import('xml2js').then(({ parseString }) => {
        parseString(xhttp.response, (err, result) => {
          R.pipe(
            R.path(['XmlSports', 'Sport', 0, 'Event']),
            R.find(R.pathEq(['$', 'Name'], 'Dota 2, 2019 [DOTA] WePlay! Valentine Madness')),
            R.prop('Match'),
            resolve,
          )(result)
        })
      })
    } else {
      reject(xhttp.statusText)
    }
  }
  xhttp.send()
})
