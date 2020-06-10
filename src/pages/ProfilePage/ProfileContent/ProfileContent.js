/* eslint-disable max-lines */
import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'formik'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import imgPropType from 'weplay-core/customPropTypes/imgPropType'

import FormAutocompleteDisabler from 'weplay-components/FormAutocompleteDisabler'
import IsomorphicHead from 'weplay-components/IsomorphicHead'
import LegacyButton from 'weplay-components/LegacyButton'
import Datepicker from 'weplay-components/Datepicker/loadable'
import FieldWrapper from 'weplay-components/FieldWrapper'
import PasswordInput from 'weplay-components/PasswordInput'
import GenderSelect from 'weplay-components/Forms/GenderSelect'
import NicknameInputComponent from 'weplay-components/NicknameInput'
import FormInputGroup from 'weplay-components/FormInputGroup'
import PageSectionTitle from 'weplay-components/PageSectionTitle'

import LogOut from './LogOut'
import DeleteAccountModal from './DeleteAccountModal'
import container from './container'
import styles from './ProfileContent.scss'

const ProfileContent = ({
  handleLogOutClick,
  touched,
  errors,
  handleChangeDate,
  birthDate,
  userGender,
  isButtonEnabled,
  handleGenderChange,
  toggleDeleteAccountModal,
  isDeleteAccountModalVisible,
  setFieldTouched,
  setFieldValue,
  setFieldError,
  setSubmitting,
  shouldValidateNickname,
  createAnalyticsWithCategory,
  openChangeEmailModal,
}) => {
  const t = useTranslation()
  return (
    <>
      {/* TODO: @illia think do we need this? */}
      <IsomorphicHead>
        <title>{t('title.profile')}</title>
      </IsomorphicHead>

      <div className={styles.block}>
        <PageSectionTitle
          text={t('mediaCore.profile.accountSettings.title')}
        />
        <Form>
          <div className={styles.content}>
            <div className={styles.grid}>
              <FormAutocompleteDisabler triggerName="email" />
              <div className="u-mb-3">
                <NicknameInputComponent
                  label={t('mediaCore.profile.accountSettings.nicknameLabel')}
                  isTouched={touched.nickname}
                  errors={errors.nickname}
                  setFieldTouched={setFieldTouched}
                  setFieldValue={setFieldValue}
                  setFieldError={setFieldError}
                  setSubmitting={setSubmitting}
                  shouldValidateNickname={shouldValidateNickname}
                  logAnalyticsWithLabel={createAnalyticsWithCategory('User Info')}
                />
              </div>
              <div className="u-mb-3">
                <FormInputGroup
                  name="email"
                  label={t('mediaCore.profile.accountSettings.emailLabel')}
                  isTouched={touched.email}
                  errors={errors.email}
                  labelFor="email"
                  type="email"
                  setFieldTouched={setFieldTouched}
                  onClick={openChangeEmailModal}
                  linkText={t('mediaCore.profile.accountSettings.changeEmail')}
                  disabled
                />
              </div>
              <div className="u-mb-3">
                <FormInputGroup
                  name="first_name"
                  label={t('mediaCore.profile.accountSettings.firstNameLabel')}
                  isTouched={touched.first_name}
                  errors={errors.first_name}
                  labelFor="first_name"
                  id="first_name"
                  setFieldTouched={setFieldTouched}
                />
              </div>
              <div className="u-mb-3">
                <FormInputGroup
                  name="last_name"
                  label={t('mediaCore.profile.accountSettings.lastNameLabel')}
                  isTouched={touched.last_name}
                  errors={errors.last_name}
                  labelFor="last_name"
                  setFieldTouched={setFieldTouched}
                />
              </div>
              <div className="u-mb-3">
                <FieldWrapper
                  label={t('mediaCore.profile.accountSettings.gender')}
                >
                  <GenderSelect
                    onChange={handleGenderChange}
                    gender={userGender}
                  />
                </FieldWrapper>
              </div>
              <div className="u-mb-3">
                <FieldWrapper
                  label={t('mediaCore.profile.accountSettings.birthday')}
                  hint={t('mediaCore.profile.accountSettings.birthdayHint')}
                  labelFor="datepicker"
                >
                  <Datepicker
                    value={birthDate}
                    onChange={handleChangeDate}
                  />
                </FieldWrapper>
              </div>
            </div>
          </div>
          <div className={styles.content}>
            <p className={styles.subtitle}>{t('mediaCore.profile.accountSettings.passwordTitle')}</p>
            <div className={styles.grid}>
              <div className={styles.wrapper}>
                {/* <div className="u-mb-3">
                   TODO: @frontend, oldPass input needs realisation
                  <FieldWrapper
                    label={t('mediaCore.profile.accountSettings.oldPass')}
                    isTouched={touched.newPass}
                    errors={errors.newPass}
                    onClick={triggerForgotPassModal}
                    linkText={t('mediaCore.profile.accountSettings.forgotPassword')}
                  >
                    <PasswordInput
                      name="newPass"
                      placeholder={t('mediaCore.profile.accountSettings.oldPasswordPlaceholder')}
                      errors={errors.newPass}
                      isTouched={touched.newPass}
                      setFieldTouched={setFieldTouched}
                    />
                  </FieldWrapper>
                </div> */}
                <div className="u-mb-3">
                  <FieldWrapper
                    label={t('mediaCore.profile.accountSettings.newPass')}
                    isTouched={touched.newPass}
                    errors={errors.newPass}
                  >
                    <PasswordInput
                      name="newPass"
                      placeholder={t('mediaCore.profile.accountSettings.passwordPlaceholder')}
                      errors={errors.newPass}
                      isTouched={touched.newPass}
                      setFieldTouched={setFieldTouched}
                    />
                  </FieldWrapper>
                </div>
                <div className="u-mb-3">
                  <FieldWrapper
                    label={t('mediaCore.profile.accountSettings.confirmation')}
                    isTouched={touched.confirmPass}
                    errors={errors.confirmPass}
                    labelFor="confirmPass"
                  >
                    <PasswordInput
                      name="confirmPass"
                      placeholder={t('mediaCore.profile.accountSettings.confirmationPasswordPlaceholder')}
                      errors={errors.confirmPass}
                      isTouched={touched.confirmPass}
                      id="confirmPass"
                      setFieldTouched={setFieldTouched}
                    />
                  </FieldWrapper>
                </div>
                <div className={styles.wrapper}>
                  <LegacyButton
                    type="submit"
                    text={t('mediaCore.profile.accountSettings.saveChanges')}
                    className={styles.button}
                    disabled={!isButtonEnabled}
                  />
                </div>
              </div>

            </div>
          </div>
          <div className={styles.content}>
            <p className={styles.subtitle}>{t('mediaCore.profile.accountSettings.logOutTitle')}</p>
            <LogOut
              onClick={handleLogOutClick}
              deleteAccountHandler={toggleDeleteAccountModal}
            />
          </div>
        </Form>
      </div>

      <DeleteAccountModal
        toggleDeleteAccountModal={toggleDeleteAccountModal}
        isShown={isDeleteAccountModalVisible}
      />
    </>
  )
}

ProfileContent.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  handleLogOutClick: PropTypes.func.isRequired,
  toggleDeleteAccountModal: PropTypes.func.isRequired,
  isDeleteAccountModalVisible: PropTypes.bool.isRequired,
  isButtonEnabled: PropTypes.bool.isRequired,
  touched: PropTypes.shape({
    nickname: PropTypes.bool,
    email: PropTypes.bool,
    first_name: PropTypes.bool,
    last_name: PropTypes.bool,
    newPass: PropTypes.bool,
    confirmPass: PropTypes.bool,
    name: PropTypes.bool,
    tag: PropTypes.bool,
  }).isRequired,
  errors: PropTypes.shape({
    nickname: PropTypes.arrayOf(PropTypes.string),
    email: PropTypes.arrayOf(PropTypes.string),
    first_name: PropTypes.arrayOf(PropTypes.string),
    last_name: PropTypes.arrayOf(PropTypes.string),
    newPass: PropTypes.arrayOf(PropTypes.string),
    confirmPass: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.arrayOf(PropTypes.string),
    tag: PropTypes.arrayOf(PropTypes.string),
    avatar: imgPropType,
  }).isRequired,
  handleChangeDate: PropTypes.func.isRequired,
  birthDate: PropTypes.instanceOf(Date),
  userGender: PropTypes.string,
  handleGenderChange: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  setFieldError: PropTypes.func.isRequired,
  setSubmitting: PropTypes.func.isRequired,
  shouldValidateNickname: PropTypes.bool.isRequired,
  createAnalyticsWithCategory: PropTypes.func.isRequired,
  openChangeEmailModal: PropTypes.func.isRequired,
}

ProfileContent.defaultProps = {
  userGender: '',
  birthDate: null,
}

export default container(ProfileContent)
