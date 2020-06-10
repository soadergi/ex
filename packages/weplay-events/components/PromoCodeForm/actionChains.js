import { activatePromoCode } from 'weplay-core/reduxs/promoCodes/actions'
import { triggerPromoCodesModal } from 'weplay-core/reduxs/_legacy/modals/actions'

export const activateCodeAndShowPopup = ({
  code,
}) => (dispatch, getState) => activatePromoCode.request(code)(dispatch, getState)
  .then(
    () => triggerPromoCodesModal(true)(dispatch, getState),
    () => triggerPromoCodesModal(true)(dispatch, getState),
  )
