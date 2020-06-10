import {
  compose,
  withHandlers,
  withPropsOnChange,
  withStateHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import { userEmailSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { isValidEmail } from 'weplay-core/helpers/isValidEmail'

const container = compose(
  connect(createStructuredSelector({
    i18nTexts: i18nTextsSelector,
    userEmail: userEmailSelector,
  })),
  withStateHandlers(
    {
      nameValid: false,
      ageValid: false,
      countryValid: false,
      detailsValid: false,
      submitted: false,
      formSuccess: false,
      formOpened: false,
      errors: {
        ageLess2Symbols: false,
        ageIsNaN: false,
        lengthDetails: false,
        isValidEmail: true,
      },
    },
    {

      handleChangeName: () => e => ({
        nameValid: e.target.value.length > 0 && e.target.value.length <= 50,
        errors: {
          nameIsToLong: e.target.value.length > 50,
        },
      }),
      handleChangeCountry: () => e => ({
        countryValid: e.target.value.length > 0 && e.target.value.length <= 50,
        errors: {
          countryIsToLong: e.target.value.length > 50,
        },
      }),
      handleChangeAnswer: () => e => ({
        answerValid: e.target.value.length > 0 && e.target.value.length <= 150,
        errors: {
          answerIsToLong: e.target.value.length > 150,
        },
      }),
      handleChangeEmail: () => e => ({
        emailValid: isValidEmail(e.target.value) && e.target.value.length < 50,
        errors: {
          invalidEmail: !isValidEmail(e.target.value),
        },
      }),
      handleChangeFBLink: () => e => ({
        FBLinkValid: e.target.value.length <= 50,
        errors: {
          FBLinkIsToLong: e.target.value.length > 50,
        },
      }),
      handleChangeTwitterLink: () => e => ({
        twitterLinkValid: e.target.value.length <= 50,
        errors: {
          TwitterLinkIsToLong: e.target.value.length > 50,
        },
      }),
      handleChangeInstagramLink: () => e => ({
        instagramLinkValid: e.target.value.length <= 50,
        errors: {
          instagramLinkIsToLong: e.target.value.length > 50,
        },
      }),

      handleChangeAge: errors => (e) => {
        if (Number(e.target.value) && e.target.value.length === 2) {
          return {
            ageValid: true,
            errors: {
              ...errors,
              ageLess2Symbols: false,
              ageIsNaN: false,
            },
          }
        }
        return {
          ageValid: false,
        }
      },
      handleBlurAge: errors => (e) => {
        if (e.target.value.length && e.target.value.length < 2) {
          return {
            errors: {
              ...errors,
              ageLess2Symbols: true,
            },
          }
        }
        if (e.target.value && !Number(e.target.value)) {
          return {
            errors: {
              ...errors,
              ageIsNaN: true,
            },
          }
        }
        return {
          errors: {
            ...errors,
            ageLess2Symbols: false,
            ageIsNaN: false,
          },
        }
      },
    },
  ),
  withPropsOnChange([
    'answerValid',
    'countryValid',
    'nameValid',
    'errors',
    'emailValid',
    'FBLinkValid',
    'twitterLinkValid',
    'instagramLinkValid',
  ], ({
    answerValid,
    countryValid,
    nameValid,
    emailValid,
    FBLinkValid,
    twitterLinkValid,
    instagramLinkValid,
  }) => ({
    submitButtonActive: emailValid && nameValid && countryValid && answerValid && FBLinkValid
        && twitterLinkValid && instagramLinkValid,
  })),
  withHandlers({
    preventReload: props => (e) => {
      if (props.submitted) e.preventDefault()
    },
  }),
)

export default container
