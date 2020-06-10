import * as Yup from 'yup'
import * as R from 'ramda'
import {
  compose,
  withHandlers,
  withPropsOnChange,
  lifecycle,
  withStateHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withFormik } from 'formik'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import withFileUploader from 'weplay-components/withFileUploader'

import { teamsActions, teamsSelectors } from 'weplay-competitive/reduxs/teams'
import { gameModesSelectors } from 'weplay-competitive/reduxs/gameModes'

import { createOrUpdateTeamAndSetErrors } from './actionChains'

const nameMaxLength = 25
const tagMaxLength = 6
const container = compose(
  withLocale,
  connect(createStructuredSelector({
    createTeamFormErrors: teamsSelectors.createFormErrorsSelector,
    updateTeamFormErrors: teamsSelectors.updateFormErrorsSelector,
    getGameModeById: gameModesSelectors.getRecordByIdSelector,
  }), {
    clearCreateTeamErrors: teamsActions.createRecord.clear,
    clearUpdateTeamErrors: teamsActions.updateRecord.clear,
    createOrUpdateTeamAndSetErrors,
  }),
  withFileUploader({
    maxFileSize: 3072000,
    maxWidth: 500,
    maxHeight: 500,
    staticServerHandler: 'avatar:tournament',
  }),
  withPropsOnChange([
    'createTeamFormErrors',
    'updateTeamFormErrors',
  ], ({
    createTeamFormErrors,
    updateTeamFormErrors,
  }) => ({
    teamFormErrors: R.concat(createTeamFormErrors, updateTeamFormErrors),
  })),
  withLocale,
  withPropsOnChange(
    ['t'],
    ({ t }) => ({
      schema: Yup.object().shape({
        name: Yup.string()
          .trim()
          .matches(/^(?:[\w]+)(?:[\w\s]*)$/, t('clientErrors.invalidTeamName'))
          .max(nameMaxLength, t('clientErrors.tooLong', { max: nameMaxLength }))
          .required(t('clientErrors.required')),
        tag: Yup.string()
          .trim()
          .max(tagMaxLength, t('clientErrors.tooLong', { max: tagMaxLength }))
          .required(t('clientErrors.required')),
      }),
    }),
  ),
  withPropsOnChange([
    'freeTeamsGameModes',
    'team',
    'getGameModeById',
  ], ({
    freeTeamsGameModes,
    team,
    getGameModeById,
  }) => ({
    dropdownOptions: team.id
      ? [{
        label: R.pipe(
          getGameModeById,
          R.prop('title'),
        )(team.relationships.gameMode.id),
        value: team.relationships.gameMode.id,
      }]
      : freeTeamsGameModes.map(gameMode => ({
        label: gameMode.title,
        value: gameMode.id,
      })),
  })),
  withStateHandlers(props => ({
    activeGameMode: props.freeTeamsGameModes ? props.freeTeamsGameModes[0].id : NaN,
  }), {
    setActiveGameMode: () => activeGameMode => ({ activeGameMode }),
  }),
  withFormik({
    displayName: 'CreateTeamModalForm',
    mapPropsToValues: props => R.pipe(
      R.prop('team'),
      R.pick([
        'name',
        'tag',
        'avatar',
        'relationships',
      ]),
      R.ifElse(
        R.isEmpty,
        R.always({
          name: '',
          tag: '',
          avatar: '',
          relationships: {
            gameMode: {
              id: props.activeGameMode,
              type: 'GameMode',
            },
          },
        }),
        R.identity,
      ),
    )(props),
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
    handleSubmit: (values, { props, setSubmitting, setErrors }) => props.createOrUpdateTeamAndSetErrors({
      setErrors,
      setSubmitting,
      onSuccess: props.onSuccess,
      team: {
        data: {
          id: props.team.id || undefined,
          type: props.team.type || 'Team',
          attributes: R.pipe(
            R.pick([
              'name',
              'tag',
              'avatar',
            ]),
            R.toPairs,
            formValues => R.difference(formValues, R.toPairs(props.team)),
            R.fromPairs,
          )(values),
          relationships: props.team.id ? undefined : {
            gameMode: {
              data: {
                id: props.activeGameMode,
                type: 'GameMode',
              },
            },
          },
        },
      },
    }),
  }),
  withHandlers({
    handleChangeDropdown: ({
      handleChange,
    }) => ({ originalEvent }) => handleChange(originalEvent),
    handleInputFile: ({
      t,
      parseFile,
      uploadFileToServer,
      setFieldValue,
      setFieldError,
      ...otherProps
    }) => (event) => {
      const file = event.target.files[0]
      parseFile(file)
        .then(
          () => uploadFileToServer(file),
          (error) => {
            const maxEdgeKey = error.message
            setFieldError(
              'avatar',
              t(`clientErrors.${maxEdgeKey}`, { max: otherProps[maxEdgeKey] }),
            )
          },
        )
        .then(fileProps => setFieldValue('avatar', fileProps.path))
    },
  }),
  lifecycle({
    componentWillUnmount() {
      // TODO: @illia think about error and loading handlers - maybe we don't need
      // loading and error branches in store?
      this.props.clearCreateTeamErrors()
      this.props.clearUpdateTeamErrors()
    },
  }),
)

export default container
