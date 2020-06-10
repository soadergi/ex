import * as R from 'ramda'
import {
  defaultProps,
  compose,
  withHandlers,
  withPropsOnChange,
  withStateHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { validNickNameRegExp } from 'weplay-core/helpers/validNickNameRegExp'
import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import {
  validateUserNickName,
} from 'weplay-core/reduxs/_legacy/auth/actions'

const INVALID_NICKNAME_ERROR_CODE = 409
const NICKNAME_MAX_LENGTH = 25

const container = compose(
  defaultProps({
    logFormAnalytics: R.always,
  }),
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
  }), {
    // actionCreators
    validateUserNickName: validateUserNickName.request,
  }),
  withStateHandlers({
    possibleNicknames: null,
    successText: '',
  }, {
    handleNicknameValidation: () => ({
      possibleNicknames,
      successText,
    }) => ({
      possibleNicknames,
      successText,
    }),
  }),
  withHandlers({
    validateNickname: props => (nickname) => {
      props.validateUserNickName({
        nickname: R.trim(nickname),
      }).then(() => {
        props.handleNicknameValidation({
          possibleNicknames: null,
          successText: props.i18nTexts.cabinet.nickSuccess,
        })
        props.logFormAnalytics({
          timingVar: 'success',
          timingLabel: 'successful',
          eventContent: 'nickname_password',
          eventContext: 'nickname',
        })
      })
        .catch((error) => {
          const errorCode = R.path(['response', 'status'], error)
          const possibleNicknames = R.path(['response', 'data'], error)
          if (errorCode === INVALID_NICKNAME_ERROR_CODE) {
            props.handleNicknameValidation({
              possibleNicknames,
              successText: '',
            })
            props.setFieldError('nickname', [props.i18nTexts.cabinet.nickAllreadyTaken])
            props.setSubmitting(false)
          }
          props.logFormAnalytics({
            timingVar: 'fail',
            timingLabel: 'unsuccessful',
            eventContent: 'nickname_password',
            eventContext: 'nickname',
            errorCode: 'nickname is taken',
          })
        })
    },

  }),
  withHandlers({
    handleNickNameBlur: props => (event) => {
      const value = event.target.value
      if (validNickNameRegExp.test(value) && props.shouldValidateNickname) {
        props.setFieldTouched('nickname', true)
        if (value.length > 2 && value.length <= NICKNAME_MAX_LENGTH) {
          props.validateNickname(value)
        }
      } else {
        props.handleNicknameValidation({
          possibleNicknames: null,
          successText: '',
        })
      }
    },
    getNicknameClickHandler: ({
      setFieldValue,
      validateNickname,
    }) => possibleNickname => () => {
      setFieldValue('nickname', possibleNickname)
      validateNickname(possibleNickname)
    },
  }),

  withPropsOnChange([
    'errors',
    'successText',
    'isTouched',
  ], ({
    errors,
    successText,
    isTouched,
  }) => ({
    nicknameSuccess: !R.isEmpty(successText) && R.isNil(errors) && isTouched,
  })),
)

export default container
