
import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Icon from 'weplay-components/Icon'
import Button, { BUTTON_COLOR, BUTTON_PRIORITY } from 'weplay-components/Button'

import styles from './Modals.scss'

const WelcomeModal = ({
  openLoginModal,
  closeModal,
}) => {
  const t = useTranslation()

  return (
    <>
      <p className={classNames(
        styles.title,
        'u-mt-3',
      )}
      >
        {t('mediaCore.gameLoonyDragon.modals.welcome.title')}
      </p>
      <span className={styles.text}>
        {t('mediaCore.gameLoonyDragon.modals.welcome.text')}
      </span>
      <div className={styles.buttonWrapper}>
        <Button
          className={styles.button}
          onClick={closeModal}
          color={BUTTON_COLOR.CTA}
        >
          {t('mediaCore.gameLoonyDragon.modals.welcome.buttonPlay')}
        </Button>
        <Button
          className={styles.button}
          onClick={openLoginModal}
          color={BUTTON_COLOR.WHITE}
          priority={BUTTON_PRIORITY.SECONDARY}
        >
          {t('mediaCore.gameLoonyDragon.modals.welcome.buttonJoin')}
        </Button>
      </div>
      <p className={styles.hintTitle}>
        {t('mediaCore.gameLoonyDragon.modals.hint.title')}
      </p>
      <p className={styles.hintText}>
        <Icon
          iconName="tap"
          className={styles.hintIcon}
          size="small"
        />
        {t('mediaCore.gameLoonyDragon.hint.first')}
      </p>
      <p className={styles.hintText}>
        <Icon
          iconName="cup"
          className={styles.hintIcon}
          size="small"
        />
        {t('mediaCore.gameLoonyDragon.hint.second')}
      </p>
    </>
  )
}

WelcomeModal.propTypes = {
  openLoginModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default React.memo(WelcomeModal)
