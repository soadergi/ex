import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import withLocale from 'weplay-singleton/LocaleProvider/withLocale'
import withRouter from 'weplay-singleton/RouterProvider/withRouter'
import { triggerPromoCodesModal } from 'weplay-core/reduxs/_legacy/modals/actions'
import { isPromoCodesModalVisibileSelector } from 'weplay-core/reduxs/_legacy/modals/reducer'
import { isPromoCodeSuccessSelector } from 'weplay-core/reduxs/promoCodes/reducer'
import CloseButton from 'weplay-components/CloseButton'

import star from './img/star-color.png'
import bomb from './img/bomb-color.png'

const IS_ENDED = false
class PromoCodeModal extends Component {
  handleClose = () => {
    this.props.triggerPromoCodesModal(false)
  }

  render() {
    const { t, isPromoCodeSuccess, isPromoCodesModalVisibile } = this.props
    return (
      <div
        className={`c-modal c-modal--promocodes ${isPromoCodesModalVisibile ? 'is-shown' : ''}`}
        data-gtm="Promocodes"
      >
        <div className="c-modal__dialog">
          <div className="c-modal__content">
            <CloseButton onClick={this.handleClose} />
            {IS_ENDED
              ? (
                <>
                  <div className="c-modal__header">
                    <img
                      src={bomb}
                      alt=""
                    />
                  </div>
                  <div className="c-modal__body">
                    <p className="c-modal__title">{t('codeModal.overTitle')}</p>
                  </div>
                  <p className="c-modal__footer">
                    {t('codeModal.overText')}
                  </p>
                </>
              )
              : (
                <>
                  <div className="c-modal__header">
                    {isPromoCodeSuccess
                      ? (
                        <img
                          src={star}
                          alt=""
                        />
                      )
                      : (
                        <img
                          src={bomb}
                          alt=""
                        />
                      )}
                  </div>
                  <div className="c-modal__body">
                    {isPromoCodeSuccess
                      ? <p className="c-modal__title">{t('codeModal.successTitle')}</p>
                      : <p className="c-modal__title">{t('codeModal.notSuccessTitle')}</p>}
                  </div>
                  {isPromoCodeSuccess
                    ? (
                      <p className="c-modal__footer">
                        {t('codeModal.successText')}
                      </p>
                    )
                    : (
                      <p className="c-modal__footer">
                        {t('codeModal.notSuccessText')}
                      </p>
                    )}
                </>
              )}
          </div>
        </div>
      </div>
    )
  }
}

PromoCodeModal.propTypes = {
  triggerPromoCodesModal: PropTypes.func.isRequired,
  isPromoCodesModalVisibile: PropTypes.bool.isRequired,
  isPromoCodeSuccess: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
}

export default withLocale(withRouter(connect(createStructuredSelector({
  // selectors
  isPromoCodeSuccess: isPromoCodeSuccessSelector,
  isPromoCodesModalVisibile: isPromoCodesModalVisibileSelector,
}), {
  // actionCreators
  triggerPromoCodesModal,
})(PromoCodeModal)))
