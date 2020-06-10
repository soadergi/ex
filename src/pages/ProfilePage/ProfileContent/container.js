/* eslint-disable max-lines */
import _ from 'lodash'
import { connect } from 'react-redux'
import i18n from 'i18n-react'
import * as Yup from 'yup'
import * as R from 'ramda'
import {
  compose,
  lifecycle,
  withProps,
  withHandlers,
  withPropsOnChange,
  withStateHandlers,
} from 'recompose'
import { createStructuredSelector } from 'reselect'
import { withFormik } from 'formik'

import {
  firstNameMaxLength, lastNameMaxLength, nicknameMaxLength, nicknameMinLength, passwordMaxLength,
} from 'weplay-core/consts/formsRestrictions'
import { validPassRegExp } from 'weplay-core/helpers/validPassRegExp'
import { validNickNameRegExp } from 'weplay-core/helpers/validNickNameRegExp'
import { getUserNotifications } from 'weplay-core/reduxs/notifications/actions'
import withMoment from 'weplay-core/HOCs/withMoment'
import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'
import { currentLanguageSelector, i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import { getUserWallet } from 'weplay-core/reduxs/wallets/actions'
import toaster, { TOAST_TYPE } from 'weplay-core/services/toastNotifications'
import {
  globalScopeSelector,
} from 'weplay-core/reduxs/common/selectors'
import {
  currentUserSelector,
  userInitialValuesSelector,
} from 'weplay-core/reduxs/_legacy/auth/reducer'
import {
  signOut,
  updateUser,
  changePassword,
  getUserPromoCodes,
  validateUserNickName,
} from 'weplay-core/reduxs/_legacy/auth/actions'
import { triggerForgotPassModal, triggerChangeEmailModal } from 'weplay-core/reduxs/_legacy/modals/actions'
import withAnalytics from 'weplay-core/HOCs/withAnalytics'

import withPreloader from 'weplay-components/withPreloader'

import { getTournaments } from 'weplay-events/reduxs/tournaments/actions'

import { INITIALY_VISIBLE_PROMOCODES_COUNT } from './constants'

const container = compose(
  withAnalytics,
  connect(createStructuredSelector({
    i18nTexts: i18nTextsSelector,
    currentLanguage: currentLanguageSelector,
    currentUser: currentUserSelector,
    globalScope: globalScopeSelector,
    initialValues: userInitialValuesSelector,
  }), {
    updateUser,
    changePassword,
    getUserPromoCodes,
    signOut,
    triggerForgotPassModal,
    getTournaments: getTournaments.request,
    validateUserNickName: validateUserNickName.request,
    triggerChangeEmailModal,
    clearUserWallet: getUserWallet.clear,
    clearUserNotifications: getUserNotifications.clear,
  }),

  withPageViewAnalytics(),

  withPreloader({
    mapPropsToIsLoading: R.pipe(
      R.prop('currentUser'),
      R.not,
    ),
    isFullScreen: false,
  }),

  withProps(({ i18nTexts }) => ({
    schema: Yup.object().shape({
      nickname: Yup.string()
        .trim()
        .min(nicknameMinLength, i18n.translate(i18nTexts.clientErrors.tooShort, { min: 3 }))
        .max(nicknameMaxLength, i18n.translate(i18nTexts.clientErrors.tooLong, { max: nicknameMaxLength }))
        .required(i18nTexts.clientErrors.required)
        .matches(validNickNameRegExp, i18nTexts.registration.invalidNickname),
      first_name: Yup.string()
        .trim()
        .max(firstNameMaxLength, i18n.translate(i18nTexts.clientErrors.tooLong, { max: firstNameMaxLength })),
      last_name: Yup.string()
        .trim()
        .max(lastNameMaxLength, i18n.translate(i18nTexts.clientErrors.tooLong, { max: lastNameMaxLength })),
      newPass: Yup.string()
        .trim()
        .max(passwordMaxLength, i18n.translate(i18nTexts.clientErrors.tooLong, { max: passwordMaxLength }))
        .matches(validPassRegExp, { excludeEmptyString: true, message: i18nTexts.clientErrors.invalidPassword }),
      confirmPass: Yup.string()
        .trim()
        .max(passwordMaxLength, i18n.translate(i18nTexts.clientErrors.tooLong, { max: passwordMaxLength }))
        .oneOf([Yup.ref('newPass')], i18nTexts.clientErrors.passNotEqual),
    }),
  })),

  withStateHandlers({
    isDeleteAccountModalVisible: false,
  }, {
    toggleDeleteAccountModal: ({ isDeleteAccountModalVisible }) => () => ({
      isDeleteAccountModalVisible: !isDeleteAccountModalVisible,
    }),
  }),

  withHandlers({
    handleUpdateUser: props => ({
      updatedFields,
      values,
      resetForm,
      setSubmitting,
    }) => {
      props.updateUser({
        body: updatedFields,
      }, { headers: { 'Content-Type': 'application/json' } })
        .then((response) => {
          // TODO we don`t have error handling here because it is a part of old code,
          //  that using old config apiClient.js and not throwing errors
          if (response) {
            resetForm({
              ...values,
              newPass: '',
              confirmPass: '',
            })
            setSubmitting(false)
          }
          return response
        })
        .then(() => {
          toaster.showNotification({
            type: TOAST_TYPE.SUCCESS,
            content: R.path(['mediaCore', 'notifications', 'success', 'changesSaved'], props.i18nTexts),
          })
        })
    },

  }),

  withFormik({
    displayName: 'ProfilePageForm',
    enableReinitialize: true,
    mapPropsToValues:
      R.pipe(
        R.prop('currentUser'),
        R.defaultTo({}),
        R.pick([
          'nickname',
          'first_name',
          'last_name',
          'email',
          'gender',
          'birth_date',
          'avatar_path',
        ]),
        R.assoc('newPass', ''),
        R.assoc('confirmPass', ''),
      ),
    validate: (values, props) => props.schema.validate(values, { abortEarly: false })
      .then(
        () => Promise.resolve({}),
        R.pipe(
          R.prop('inner'),
          R.map(fieldError => [fieldError.path, fieldError.errors]),
          R.fromPairs,
          errors => Promise.reject(errors),
        ),
      ),

    handleSubmit: (values, { props, resetForm, setSubmitting }) => {
      const userFields = R.omit(['newPass', 'confirmPass'], values)
      let updatedFields = {}
      R.forEachObjIndexed((value, key) => {
        if (!R.equals(value, props.initialValues.user[_.camelCase(key)])) {
          updatedFields = { [key]: value, ...updatedFields }
        }
      })(userFields)

      const { newPass, confirmPass } = values
      if (newPass && (confirmPass === newPass)) {
        props.changePassword({
          body: {
            password: newPass,
            retry_password: confirmPass,
          },
        }, { headers: { 'Content-Type': 'application/json' } })
          .then(() => props.handleUpdateUser({
            updatedFields,
            values,
            resetForm,
            setSubmitting,
          }))
          .catch(() => setSubmitting(false))
      } else {
        props.handleUpdateUser({
          updatedFields,
          values,
          resetForm,
          setSubmitting,
        })
      }
    },
  }),
  withMoment,
  withHandlers({
    handleGenderChange: ({ setFieldValue }) => (gender) => {
      // TODO @Artem look for better decision to update field value in non form elements
      setFieldValue('gender', gender)
    },
    handleChangeDate: ({ setFieldValue, moment }) => (date) => {
      setFieldValue('birth_date', moment(date).format('YYYY-MM-DD'))
    },
    handleLogOut: ({
      signOut, // eslint-disable-line no-shadow
      logAnalytics,
      clearUserWallet,
      clearUserNotifications,
    }) => () => {
      signOut().then(() => {
        clearUserWallet()
        clearUserNotifications()
      })
      logAnalytics({
        eventCategory: 'Interactions',
        eventAction: 'logOut',
      })
    },
  }),
  withHandlers({
    handleLogOutClick: props => () => {
      const { handleLogOut, touched } = props
      if (!R.isEmpty(touched)) {
          const confirmAnswer = confirm(props.i18nTexts.cabinet.confirmLogout); // eslint-disable-line
        if (confirmAnswer) {
          handleLogOut()
        }
      } else {
        handleLogOut()
      }
    },
    createAnalyticsWithCategory: ({
      logAnalytics,
    }) => eventCategory => (eventLabel) => {
      logAnalytics({
        eventCategory,
        eventAction: 'Possible Nicknames',
        eventLabel,
      })
    },
    openChangeEmailModal: props => () => {
      props.triggerChangeEmailModal()
    },
  }),
  withPropsOnChange([
    'values',
  ], ({
    values,
  }) => ({
    userGender: values.gender,
    birthDate: values.birth_date ? new Date(values.birth_date) : null,
  })),

  withPropsOnChange([
    'errors',
    'currentUser',
    'values',
    'dirty',
    'isSubmitting',
  ], ({
    errors,
    currentUser,
    values,
    dirty,
    isSubmitting,
  }) => ({
    isButtonEnabled: R.isEmpty(errors) && dirty && (values.newPass === values.confirmPass) && !isSubmitting,
    shouldValidateNickname: currentUser.nickname !== values.nickname,
  })),

  lifecycle({
    componentDidMount() {
      this.props.getTournaments({ with: 'title,stages' })
      this.props.getUserPromoCodes({
        params: {
          user_id: this.props.currentUser.id,
          limit: INITIALY_VISIBLE_PROMOCODES_COUNT,
        },
      })
    },
  }),
)

export default container
