import {
  compose,
  withHandlers,
  withPropsOnChange,
  withStateHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withMoment from 'weplay-core/HOCs/withMoment'
import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import { currentUserSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

const container = compose(
  connect(createStructuredSelector({
    i18nTexts: i18nTextsSelector,
    currentUser: currentUserSelector,
  }), {
  }),
  withStateHandlers(
    {
      formOpened: false,
      submitted: false,
      formSuccess: false,
    },
    {
      openForm: () => () => ({
        formOpened: true,
      }),
      handleSubmitForm: () => () => ({
        submitted: true,
        formSuccess: true,
        formOpened: false,
      }),
    },
  ),
  withHandlers({
    handleOpenForm: props => () => {
      props.openForm()
    },
  }),
  withMoment,
  withPropsOnChange([
    'moment',
  ], ({
    moment,
  }) => ({
    isClosed: moment().isAfter('2019-03-03T02:00:00+00:00'),
    formName: 'TugOfWarForm',
    actionUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdPPv1mt8sBlk4rbIWcNKOQv5nC8J5-O8O4axTTlaFc7f7nww/'
        + 'formResponse',
    formCredentials: {
      email: 'entry.720527309',
      name: 'entry.1290529763',
      country: 'entry.963138436',
      nickNameOrFBlLink: 'entry.407667619',
      twitterLink: 'entry.1870505910',
      instagramLink: 'entry.452578967',
      questionAnswer: 'entry.1990451912',
    },
  })),
  withPropsOnChange([
    'formSuccess',
    'i18nTexts',
    'formName',
  ], ({
    formSuccess,
    i18nTexts,
    formName,
  }) => ({
    titleStatus: formSuccess ? i18nTexts.forms[formName].success : i18nTexts.forms[formName].default,
    userStatus: i18nTexts.forms[formName].description,
  })),
)

export default container
