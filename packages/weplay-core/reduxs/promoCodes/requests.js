import * as R from 'ramda'

import { axios } from 'weplay-core/services/axios'

const PROMO_URL = '/promo-service/activations'
const PROMO_CONFIG_URL = '/promo-service/promo-config'
export const getPromoCodesCountRequest = ({ activatedDateFrom, activatedDateTo }) => axios
  .get(`${PROMO_URL}/count`, {
    params: {
      activated_date_from: activatedDateFrom,
      activated_date_to: activatedDateTo,
    },
  })
  .then(
    R.prop('data'),
  )
export const activatePromoCodeRequest = code => axios.post(PROMO_URL, { promocode: code })
  .then(
    R.pipe(
      R.prop('data'),
      R.ifElse(
        R.propEq('status', 'unsuccess'),
        R.always(
          Promise.reject({ // eslint-disable-line
            message: 'unsuccess',
          }),
        ),
        R.identity,
      ),
    ),
    R.pipe(
      R.path(['response', 'data']), // axios
      R.prop(['error']),
      error => Promise.reject(error),
    ),
  )

export const getPromoConfigRequest = () => axios.get(PROMO_CONFIG_URL)
  .then(
    R.prop('data'),
  )
