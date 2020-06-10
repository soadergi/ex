import React from 'react'
import PropTypes from 'prop-types'
import Button from 'weplay-components/Button'
import Input from 'weplay-components/Input'

import styles from '../styles.scss'

import LegacyFormInputGroup from './LegacyFormInputGroup'
import container from './container'

const formStyle = { display: 'none' }
const GoogleFormComponent = ({
  i18nTexts,
  errors,
  handleChangeCountry,
  handleChangeAnswer,
  handleSubmitForm,
  preventReload,
  handleChangeName,
  handleChangeEmail,
  actionUrl,
  formName,
  submitButtonActive,
  formCredentials,
  handleChangeFBLink,
  handleChangeTwitterLink,
  handleChangeInstagramLink,
}) => (
  <div className={styles.body}>
    <iframe
      title="hidden-iframe"
      name="hidden-iframe"
      id="hidden-iframe"
      style={formStyle}
      onLoad={preventReload}
    />
    <div className={styles.container}>
      <form
        action={actionUrl}
        method="POST"
        target="hidden-iframe"
      >
        <LegacyFormInputGroup
          labelText={i18nTexts.forms.email}
          hasError={errors.invalidEmail}
          errorText={errors.invalidEmail ? i18nTexts.forms[formName].invalidEmail : ''}
        >
          <Input
            type="email"
            name={formCredentials.email}
            id="candidate-email"
            onChange={handleChangeEmail}
          />
        </LegacyFormInputGroup>
        <LegacyFormInputGroup
          labelText={i18nTexts.forms.name}
          hasError={errors.nameIsToLong}
          errorText={errors.nameIsToLong ? i18nTexts.forms[formName].textIsToLong : ''}
        >
          <Input
            name={formCredentials.name}
            id="candidate-name"
            onChange={handleChangeName}
          />
        </LegacyFormInputGroup>
        <LegacyFormInputGroup
          labelText={i18nTexts.forms.country}
          hasError={errors.countryIsToLong}
          errorText={errors.countryIsToLong ? i18nTexts.forms[formName].textIsToLong : ''}
        >
          <Input
            name={formCredentials.country}
            id="candidate-country"
            onChange={handleChangeCountry}
          />
        </LegacyFormInputGroup>
        <LegacyFormInputGroup
          labelText={i18nTexts.forms[formName].nickNameOrFBlLink}
          hasError={errors.FBLinkIsToLong}
          errorText={errors.FBLinkIsToLong ? i18nTexts.forms[formName].textIsToLong : ''}
        >
          <Input
            name={formCredentials.nickNameOrFBlLink}
            id="candidate-description"
            onChange={handleChangeFBLink}
          />
        </LegacyFormInputGroup>
        <LegacyFormInputGroup
          labelText={i18nTexts.forms[formName].twitterLink}
          hasError={errors.TwitterLinkIsToLong}
          errorText={errors.TwitterLinkIsToLong ? i18nTexts.forms[formName].textIsToLong : ''}
        >
          <Input
            name={formCredentials.twitterLink}
            id="candidate-country"
            onChange={handleChangeTwitterLink}
          />
        </LegacyFormInputGroup>
        <LegacyFormInputGroup
          labelText={i18nTexts.forms[formName].instagramLink}
          hasError={errors.instagramLinkIsToLong}
          errorText={errors.instagramLinkIsToLong ? i18nTexts.forms[formName].textIsToLong : ''}
        >
          <Input
            name={formCredentials.instagramLink}
            id="candidate-country"
            onChange={handleChangeInstagramLink}
          />
        </LegacyFormInputGroup>
        <LegacyFormInputGroup
          labelText={i18nTexts.forms[formName].questionAnswer}
          hasError={errors.answerIsToLong}
          errorText={errors.answerIsToLong ? i18nTexts.forms[formName].answerIsToLong : ''}
        >
          <Input
            name={formCredentials.questionAnswer}
            id="candidate-country"
            onChange={handleChangeAnswer}
            placeholder={i18nTexts.forms[formName].answerPlaceholder}
          />
        </LegacyFormInputGroup>
        <Button
          className={styles.btn}
          type="submit"
          onClick={handleSubmitForm}
          disabled={!submitButtonActive}
        >
          {i18nTexts.forms[formName].button}
        </Button>
      </form>
    </div>
  </div>
)

GoogleFormComponent.propTypes = {
  i18nTexts: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({
    invalidEmail: PropTypes.bool.isRequired,
    nameIsToLong: PropTypes.bool.isRequired,
    countryIsToLong: PropTypes.bool.isRequired,
    FBLinkIsToLong: PropTypes.bool.isRequired,
    TwitterLinkIsToLong: PropTypes.bool.isRequired,
    instagramLinkIsToLong: PropTypes.bool.isRequired,
    answerIsToLong: PropTypes.bool.isRequired,
  }).isRequired,
  handleChangeCountry: PropTypes.func.isRequired,
  handleChangeAnswer: PropTypes.func.isRequired,
  handleSubmitForm: PropTypes.func.isRequired,
  preventReload: PropTypes.func.isRequired,
  handleChangeName: PropTypes.func.isRequired,
  actionUrl: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  submitButtonActive: PropTypes.bool.isRequired,
  formCredentials: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    nickNameOrFBlLink: PropTypes.string.isRequired,
    twitterLink: PropTypes.string.isRequired,
    instagramLink: PropTypes.string.isRequired,
    questionAnswer: PropTypes.string.isRequired,
  }).isRequired,
  handleChangeEmail: PropTypes.func.isRequired,
  handleChangeFBLink: PropTypes.func.isRequired,
  handleChangeTwitterLink: PropTypes.func.isRequired,
  handleChangeInstagramLink: PropTypes.func.isRequired,
}

export default container(GoogleFormComponent)
