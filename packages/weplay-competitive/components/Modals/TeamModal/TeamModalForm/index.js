import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import imgPropType from 'weplay-core/customPropTypes/imgPropType'

import Select from 'weplay-components/Select'
import TextMessage from 'weplay-components/TextMessage'
import UserAvatar from 'weplay-components/UserAvatar'
import FieldWrapper from 'weplay-components/FieldWrapper'
import Input from 'weplay-components/Input'
import Button, { BUTTON_COLOR, BUTTON_PRIORITY } from 'weplay-components/Button'

import teamPropType from 'weplay-competitive/customPropTypes/teamPropType'

import container from './container'
import styles from './styles.scss'

const dropdownStyle = { width: '100%', height: '2.5rem' } // overwriteen inline styles of preact
const tagClasses = { field: styles.tag }

const TeamModalForm = ({
  // required props
  onAbort,

  // props from container
  handleInputFile,
  t,
  dropdownOptions,
  setActiveGameMode,
  activeGameMode,

  // from Formik
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  // optional props
  team,
}) => (
  <form
    className="c-modal__body"
    onSubmit={handleSubmit}
  >
    <p className="u-color-gray u-mb-3">
      {t(`competitive.member.teamCard.${
        team.id
          ? 'updateTeamSubtitle'
          : 'createTeamSubtitle'
      }`)}
    </p>
    {errors.avatar && (
      <TextMessage
        isError
        className="u-mb-3"
      >
        {errors.avatar}
      </TextMessage>
    )}
    <p className="u-mb-1">{t('competitive.member.teamCard.createTeamModalTitle')}</p>
    <div className={classNames(
      styles.add,
      'u-mb-3',
    )}
    >
      <UserAvatar
        className={styles.avatar}
        avatar={values.avatar}
        size="64"
      />
      <div>
        <label
          htmlFor="teamAvatar"
          className={styles.link}
        >
          {t('competitive.member.teamCard.createTeamChooseImage')}
        </label>
        <input
          accept="image/jpeg, image/png, image/jpg"
          onInput={handleInputFile}
          type="file"
          id="teamAvatar"
          className="u-hidden"
        />
        <span className={styles.info}>
          {t('competitive.member.teamCard.createTeamChooseImageInfo')}
        </span>
      </div>
    </div>
    <div className="c-modal__input u-mb-2">
      <FieldWrapper
        label={t('competitive.member.teamCard.createTeamName')}
        isTouched={touched.name}
        errors={errors.name}
      >
        <Input
          value={values.name}
          name="name"
          placeholder={t('competitive.member.teamCard.createTeamNamePlaceholder')}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>
    </div>
    <div className="c-modal__input u-mb-4">
      <FieldWrapper
        label={t('competitive.member.teamCard.createTeamTag')}
        isTouched={touched.tag}
        errors={errors.tag}
        hint={t('competitive.member.teamCard.createTeamTagMessage')}
        classes={tagClasses}
      >
        <Input
          value={values.tag}
          name="tag"
          placeholder={t('competitive.member.teamCard.createTeamTagPlaceholder')}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>
    </div>
    <div className="c-modal__input u-mb-2">
      <FieldWrapper
        label={t('competitive.member.teamCard.createTeamModePlaceholder')}
        isTouched={false}
      >
        {/* Note: If we have info about team, it means that we try to change it, otherwise we try create team  */}
        <Select
          isDisabled={!!team.id}
          value={team.id ? team.relationships.gameMode.id : activeGameMode}
          options={dropdownOptions}
          onChange={setActiveGameMode}
          style={dropdownStyle}
        />
      </FieldWrapper>
    </div>
    <div className={styles.controls}>
      <Button
        type="submit"
        className={classNames(
          'u-mr-sm-2',
          'u-mb-2',
          'u-mb-sm-0',
          styles.button,
        )}
        disabled={isSubmitting}
      >
        {t(`competitive.member.teamCard.${
          team.id
            ? 'updateTeamButton'
            : 'createTeamButton'
        }`)}
      </Button>
      <Button
        color={BUTTON_COLOR.BLACK}
        priority={BUTTON_PRIORITY.SECONDARY}
        className={styles.button}
        onClick={onAbort}
      >
        {t('competitive.member.teamCard.cancel')}
      </Button>
    </div>
  </form>
)

TeamModalForm.propTypes = {
  // required props
  onAbort: PropTypes.func.isRequired,

  // props from container
  handleInputFile: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  dropdownOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  })).isRequired,
  // from Formik
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  setActiveGameMode: PropTypes.func.isRequired,
  activeGameMode: PropTypes.number.isRequired,
  values: PropTypes.shape({
    name: PropTypes.string,
    tag: PropTypes.string,
    avatar: imgPropType,
  }).isRequired,
  touched: PropTypes.shape({
    name: PropTypes.bool,
    tag: PropTypes.bool,
  }).isRequired,
  errors: PropTypes.shape({
    name: PropTypes.arrayOf(PropTypes.string),
    tag: PropTypes.arrayOf(PropTypes.string),
    avatar: imgPropType,
  }).isRequired,
  // optional props
  team: teamPropType,
}

TeamModalForm.defaultProps = {
  // optional props
  team: {},
}

export default container(TeamModalForm)
