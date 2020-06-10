import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  triggerForgotPassModal,
  triggerSignUpModal,
} from 'weplay-core/reduxs/_legacy/modals/actions'
import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
import HeadButton from 'weplay-components/_modal-components/HeadButton'
import Header from 'weplay-components/_modal-components/Header'
import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

// TODO: @frontend, @Artem, this component needs refactoring

class ForgotPassHeader extends Component {
  handleOpenSignUp = () => {
    this.props.triggerForgotPass()
    this.props.triggerSignUp()
  }

  // TODO: @frontend, @Artem, this component needs refactoring

  render() {
    const {
      t,
      isMobileWidth,
      actionType,
    } = this.props

    return (
      <Header
        title={t(`registration.${actionType}.title`)}
        subtitle={t(`registration.${actionType}.subTitle`)}
      >
        {actionType === 'forgotPassStep1' && !isMobileWidth && (
          <HeadButton
            onClick={this.handleOpenSignUp}
            text={t('registration.signUpTitle')}
          />
        )}
      </Header>
    )
  }
}

ForgotPassHeader.propTypes = {
  actionType: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  isMobileWidth: PropTypes.bool.isRequired,
  triggerSignUp: PropTypes.func.isRequired,
  triggerForgotPass: PropTypes.func.isRequired,
}

const container = connect(createStructuredSelector({
  // selectors
  isMobileWidth: isMobileWidthSelector,
}), {
  // actionCreators
  triggerSignUp: triggerSignUpModal,
  triggerForgotPass: triggerForgotPassModal,
})

export default withLocale(container(ForgotPassHeader))
