import { withFormik } from 'formik'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, withProps, withPropsOnChange } from 'recompose'
import { createStructuredSelector } from 'reselect'
import * as Yup from 'yup'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'
import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import { getUserNotifications } from 'weplay-core/reduxs/notifications/actions'
import {
  signupUrlMaxLength, nicknameMaxLength, nicknameMinLength, passwordMaxLength,
} from 'weplay-core/consts/formsRestrictions'
import { validNickNameRegExp } from 'weplay-core/helpers/validNickNameRegExp'
import { validPassRegExp } from 'weplay-core/helpers/validPassRegExp'
import withAnalytics from 'weplay-core/HOCs/withAnalytics'
import withAuthService from 'weplay-core/HOCs/withAuthService'
import { createNewUser, updateUser } from 'weplay-core/reduxs/_legacy/auth/actions'
import { userInitialValuesSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import {
  isAgilityParticipantSelector,
  isAuthorizedForLanTicketSelector,
  isBellSourceSelector,
  isIntelligenceParticipantSelector,
  isTournamentBetaPlayerSelector,
  isTournamentDota2BetaPlayerSelector,
  signUpSourceSelector,
} from 'weplay-core/reduxs/_legacy/modals/reducer'
import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'

export default compose(
  withRouter,
  withLocale,
  connect(createStructuredSelector({
    userInitialValues: userInitialValuesSelector,
    signUpSource: signUpSourceSelector,
    isBellSource: isBellSourceSelector,
    isAgilityParticipant: isAgilityParticipantSelector,
    isIntelligenceParticipant: isIntelligenceParticipantSelector,
    isTournamentBetaPlayer: isTournamentBetaPlayerSelector,
    isTournamentDota2BetaPlayer: isTournamentDota2BetaPlayerSelector,
    isAuthorizedForLanTicket: isAuthorizedForLanTicketSelector,
    globalScope: globalScopeSelector,
  }), {
    createNewUser,
    //  UMS doesn't support this flag during creation
    updateUser, // TODO: @illia remove after JAVA team fix
    getUserNotifications: getUserNotifications.request,
  }),
  withAnalytics,
  withProps(({ t }) => ({
    schema: Yup.object().shape({
      nickname: Yup.string()
        .trim()
        .min(nicknameMinLength, t('cabinetnicknameTooShort', { min: nicknameMinLength }))
        .max(nicknameMaxLength, t('cabinettooLong', { max: nicknameMaxLength }))
        .matches(validNickNameRegExp, { excludeEmptyString: true, message: t('registration.invalidNickname') })
        .required(t('clientErrors.required')),
      password: Yup.string()
        .trim()
        .max(passwordMaxLength, t('clientErrors.tooLong', { max: passwordMaxLength }))
        .matches(validPassRegExp, { excludeEmptyString: true, message: t('clientErrors.invalidPassword') })
        .required(t('clientErrors.required')),
    }),
  })),
  withFormik({
    mapPropsToValues: () => ({
      nickname: '',
      password: '',
    }),
    displayName: 'SignUpStep3Form',
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
    handleSubmit: (values, { props }) => {
      props.createNewUser({
        body: {
          email: props.userInitialValues.user.email,
          code: props.userInitialValues.user.code,
          nick_name: values.nickname,
          password: values.password,
          sign_up_source: props.signUpSource || 'DEFAULT',
          sign_up_uri: props.globalScope.location.pathname.substring(0, signupUrlMaxLength),
          agility_participant: props.isAgilityParticipant,
          intelligence_participant: props.isIntelligenceParticipant,
          next_artifact_participant: false,
        },
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          ...props.isBellSource && {
            is_bell_source: true,
          },
        },
      }).then(() => {
        props.goToStep()
        const patchBody = {
          ...props.isTournamentBetaPlayer && {
            is_tournament_beta_player: true,
          },
          ...props.isTournamentDota2BetaPlayer && {
            is_tournament_dota2_beta_player: true,
          },
          ...props.isAuthorizedForLanTicket && {
            lan_ticket_participant: true,
          },
        }

        props.logAnalytics({
          eventCategory: 'Interactions',
          eventAction: 'form',
          eventLabel: 'registration',
          eventContext: props.location.pathname,
        })

        props.getUserNotifications({
          params: {
            'page[offset]': 0,
            'page[limit]': 20,
            sort: '-create_datetime',
          },
        })

        return !R.isEmpty(patchBody) && props.updateUser({
          body: patchBody,
        }, { headers: { 'Content-Type': 'application/json' } })
      }).catch(props.handleAuthError)
    },

  }),
  withAuthService,
  withPropsOnChange([
    'dirty',
    'errors',
    'isSubmitting',
  ], ({
    dirty,
    errors,
    isSubmitting,
  }) => ({
    isButtonEnabled: R.isEmpty(errors) && dirty && !isSubmitting,
  })),
)
