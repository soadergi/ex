import * as R from 'ramda'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ModalControls from 'weplay-components/_modal-components/ModalControls'

import styles from './styles.scss'
import container from './container'

const buttonBorder = ['blockBorderBlue']

const FIRST_SYMBOL = 0
const SECOND_SYMBOL = 1
const THIRD_SYMBOL = 2
const FOURTH_SYMBOL = 3
const KEY_CODE_0 = 48
const KEY_CODE_9 = 57
const KEY_CODE_NUM_0 = 96
const KEY_CODE_NUM_9 = 105
const KEY_BACKSPACE = 8
const KEY_DELETE = 46
const KEY_ARROW_LEFT = 37
const KEY_ARROW_RIGHT = 39

class VerificationCodeForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      canSendCode: true,
      code: {
        symb1: '',
        symb2: '',
        symb3: '',
        symb4: '',
      },
      secondsBeforeNewRequest: 15,
    }
    this.code1 = React.createRef()
    this.code2 = React.createRef()
    this.code3 = React.createRef()
    this.code4 = React.createRef()
  }

  componentDidMount() {
    this.resetCode()
    this.props.resetAuthError()
  }

  get currentCodeString() {
    return `${this.state.code.symb1}${this.state.code.symb2}${this.state.code.symb3}${this.state.code.symb4}`
  }

  get isValidCode() {
    const {
      code,
    } = this.state

    return code.symb1 && code.symb2 && code.symb3 && code.symb4
  }

  resetCode = () => {
    clearTimeout(this.timeoutRequest)

    this.setState({
      code: {
        symb1: '',
        symb2: '',
        symb3: '',
        symb4: '',
      },
      secondsBeforeNewRequest: 15,
      canSendCode: true,
    })
  };

  unlockSendingCode = () => {
    if (this.state.secondsBeforeNewRequest > 0) {
      this.timeoutRequest = setTimeout(this.unlockSendingCode, 1000)
    }
    this.setState(state => ({
      canSendCode: state.secondsBeforeNewRequest <= 0,
      secondsBeforeNewRequest: state.secondsBeforeNewRequest - 1,
    }))
  };

  handleKeyDown = (event, prevInput, nextInput) => {
    // Del and Backspace
    if (event.keyCode === KEY_BACKSPACE || event.keyCode === KEY_DELETE) {
      event.preventDefault()
      event.stopPropagation()
      const char = event
      if (char.target.value === '') {
        this[prevInput].current.focus()
      } else {
        char.target.value = ''
      }
      this.props.resetAuthError()
      return
    }
    // Arrow right
    if (event.keyCode === KEY_ARROW_RIGHT) {
      this[nextInput].current.focus()
      return
    }
    // Arrow left
    if (event.keyCode === KEY_ARROW_LEFT) {
      this[prevInput].current.focus()
      return
    }
    if (!(event.ctrlKey || event.altKey
      || (event.keyCode >= KEY_CODE_0 && event.keyCode <= KEY_CODE_9 && event.shiftKey === false)
      || (event.keyCode >= KEY_CODE_NUM_0 && event.keyCode <= KEY_CODE_NUM_9))) {
      event.preventDefault()
      event.stopPropagation()
    }
  };

  checkInputCodeSymbol = ({ target: { value } }, currentIndex) => {
    if (!Number.isNaN(value) && currentIndex !== FOURTH_SYMBOL) {
      this[`code${currentIndex + 2}`].current.focus()
    }
    if (currentIndex === FOURTH_SYMBOL) {
      this.props.logAnalyticsWithAction('Code entered')
    }
    this.setState(state => ({
      code: {
        ...state.code,
        [`symb${currentIndex + 1}`]: value,
      },
    }))
    this.props.resetAuthError()
  };

  handlePastCode = (e) => {
    const paste = (e.clipboardData || window.clipboardData).getData('text')
    const symbols = paste.split('')
    if (R.none(Number.isNaN)(symbols)) {
      this.setState({
        code: {
          symb1: symbols[FIRST_SYMBOL],
          symb2: symbols[SECOND_SYMBOL],
          symb3: symbols[THIRD_SYMBOL],
          symb4: symbols[FOURTH_SYMBOL],
        },
      })
      this.props.logAnalyticsWithAction('Code entered')
      this.code4.current.focus()
      this.props.resetAuthError()
    }

    e.preventDefault()
    e.stopPropagation()
  };

  handleOnValidateCode = (e) => {
    e.preventDefault()
    this.props.validateCode({
      code: this.currentCodeString,
    })
  };

  handleSendNewCode = () => {
    this.props.resendCode()
    this.setState({
      canSendCode: false,
      secondsBeforeNewRequest: 15,
    })
    this.timeoutRequest = setTimeout(this.unlockSendingCode, 1000)
    this.props.logAnalyticsWithAction('Send code again')
  };

  render() {
    const {
      t,
      authErrorMessage,
      goToStep,
    } = this.props

    const {
      canSendCode,
      secondsBeforeNewRequest,
    } = this.state

    const setCodeErrors = () => {
      switch (authErrorMessage) {
        case 'Invalid code':
          return (<p className="o-text-error">{t('mediaCore.serverErrors.invalidCode')}</p>)
        case 'Code expired':
          return (<p className="o-text-error">{t('mediaCore.serverErrors.codeExpired')}</p>)
        default:
          return (<span className={styles.passwordText}>{t('mediaCore.registration.resendQuestion')}</span>)
      }
    }
    return (
      <div className="step-two">
        <form onSubmit={e => this.handleOnValidateCode(e)}>
          <div className={styles.password}>
            <div className={styles.passwordBody}>
              <input
                type="tel"
                value={this.state.code.symb1}
                className={styles.input}
                maxLength="1"
                onPaste={this.handlePastCode}
                onKeyDown={e => this.handleKeyDown(e, 'code1', 'code2')}
                onChange={e => this.checkInputCodeSymbol(e, FIRST_SYMBOL)}
                ref={this.code1}
                placeholder="_"
              />
              <input
                type="tel"
                value={this.state.code.symb2}
                className={styles.input}
                maxLength="1"
                onKeyDown={e => this.handleKeyDown(e, 'code1', 'code3')}
                onChange={e => this.checkInputCodeSymbol(e, SECOND_SYMBOL)}
                ref={this.code2}
                placeholder="_"
              />
              <input
                type="tel"
                value={this.state.code.symb3}
                className={styles.input}
                maxLength="1"
                onKeyDown={e => this.handleKeyDown(e, 'code2', 'code4')}
                onChange={e => this.checkInputCodeSymbol(e, THIRD_SYMBOL)}
                ref={this.code3}
                placeholder="_"
              />
              <input
                type="tel"
                value={this.state.code.symb4}
                className={styles.input}
                maxLength="1"
                onKeyDown={e => this.handleKeyDown(e, 'code3', 'code4')}
                onChange={e => this.checkInputCodeSymbol(e, FOURTH_SYMBOL)}
                ref={this.code4}
                placeholder="_"
              />
            </div>
            {canSendCode
              ? (
                <div className={styles.passwordMessage}>
                  {setCodeErrors()}
                  <a
                    className={styles.passwordLink}
                    onClick={this.handleSendNewCode}
                  >
                    {' '}
                    {t('mediaCore.registration.resendCode')}
                  </a>
                </div>
              )
              : (
                <div className={styles.passwordMessage}>
                  <span>
                    {t('mediaCore.registration.waitForNewRequestCodePart1')}
                    {secondsBeforeNewRequest}
                    {t('mediaCore.registration.waitForNewRequestCodePart2')}
                  </span>
                </div>
              )}
          </div>
          <ModalControls
            secondaryButtonType="submit"
            primaryButtonText={t('mediaCore.registration.next')}
            secondaryButtonText={t('mediaCore.registration.prev')}
            primaryButtonCallback={this.handleOnValidateCode}
            primaryButtonDisabled={!this.isValidCode}
            secondaryButtonModifiers={buttonBorder}
            secondaryButtonCallback={() => goToStep('signUpStep1')}
          />
        </form>
      </div>
    )
  }
}

VerificationCodeForm.propTypes = {
  validateCode: PropTypes.func.isRequired,
  resendCode: PropTypes.func.isRequired,
  resetAuthError: PropTypes.func.isRequired,
  userInitialValues: PropTypes.shape({
    user: PropTypes.shape({
      email: PropTypes.string,
    }),
  }).isRequired,
  t: PropTypes.func.isRequired,
  authErrorMessage: PropTypes.string,
  logAnalyticsWithAction: PropTypes.func,
  goToStep: PropTypes.func,
}

VerificationCodeForm.defaultProps = {
  authErrorMessage: null,
  logAnalyticsWithAction: R.always,
  goToStep: R.always,
}

export default container(VerificationCodeForm)
