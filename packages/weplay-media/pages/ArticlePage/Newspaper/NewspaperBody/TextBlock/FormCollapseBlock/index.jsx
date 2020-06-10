import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import SvgIcon from 'weplay-components/SvgIcon'
import Icon from 'weplay-components/Icon'
import Button from 'weplay-components/Button'

import GoogleFormComponent from './GoogleFormComponent'
import container from './container'
import styles from './styles.scss'

const FormCollapseBlock = ({
  i18nTexts,
  formCredentials,
  actionUrl,
  formOpened,
  formSuccess,
  titleStatus,
  userStatus,
  isClosed,
  handleOpenForm,
  handleSubmitForm,
  formName,
}) => (
  <div
    className={classNames(
      styles.block,
      { [styles.isClosed]: isClosed },
      { [styles.isOpened]: formOpened },
      { [styles.hasSuccess]: formSuccess },
    )}
  >
    <div className={styles.header}>
      <div className={styles.content}>
        {isClosed && (
        <Button
          className={styles.successBtn}
        >
          <Icon
            className={styles.checkWhite}
            iconName="check"
          />
        </Button>
        )}

        <div className={styles.textBlock}>
          <h2 className={styles.title}>
            {!isClosed && (
            <div className={styles.icon}>
              {/* TODO: r we using this component? */}
              <SvgIcon
                iconName="flame"
                type="color"
              />
            </div>
            )}

            {isClosed ? i18nTexts.forms[formName].close : titleStatus}
          </h2>
          <p className={styles.description}>
            {isClosed ? i18nTexts.forms[formName].closeDescription : userStatus}
          </p>
        </div>
      </div>

      {!isClosed && (
      <Button
        className={classNames(
          styles.btn,
          { [styles.isHidden]: formOpened },
        )}
        onClick={handleOpenForm}
      >
        {i18nTexts.forms[formName].button}
      </Button>
      )}
    </div>

    <GoogleFormComponent
      formName={formName}
      actionUrl={actionUrl}
      formCredentials={formCredentials}
      handleSubmitForm={handleSubmitForm}
    />

  </div>
)

FormCollapseBlock.propTypes = {
  i18nTexts: PropTypes.shape({}).isRequired,
  formCredentials: PropTypes.shape({}).isRequired,
  actionUrl: PropTypes.string.isRequired,
  formOpened: PropTypes.bool.isRequired,
  formSuccess: PropTypes.bool,
  titleStatus: PropTypes.string.isRequired,
  userStatus: PropTypes.string.isRequired,
  isClosed: PropTypes.bool.isRequired,
  handleOpenForm: PropTypes.func.isRequired,
  handleSubmitForm: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
}

FormCollapseBlock.defaultProps = {
  formSuccess: false,
}

export default container(FormCollapseBlock)
