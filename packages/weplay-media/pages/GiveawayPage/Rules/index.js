import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Icon from 'weplay-components/Icon'
import Button, { BUTTON_PRIORITY } from 'weplay-components/Button'

import styles from './styles.scss'

const Rules = ({
  // required props
  setIsOpened,
  isOpened,
  // container props
  buttonText,
  // optional props
}) => {
  const t = useTranslation()

  const toggleSeeRules = useCallback(
    () => setIsOpened(!isOpened),
    [isOpened],
  )

  return (
    <div className={classNames(
      styles.block,
      {
        [styles.isOpened]: isOpened,
      },
    )}
    >
      <div className={styles.content}>
        <div className={styles.textWrap}>
          <h3 className={styles.title}>
            {t('mediaCore.giveawayPage.seeRules.title1')}
          </h3>
          <p className={styles.text}>
            {t('mediaCore.giveawayPage.seeRules.text1')}
          </p>
        </div>
        <div className={styles.text}>
          <h3 className={styles.title}>
            {t('mediaCore.giveawayPage.seeRules.title2')}
          </h3>
          <p className={styles.text}>
            {t('mediaCore.giveawayPage.seeRules.text2')}
          </p>
        </div>
      </div>

      <Button
        type="button"
        className={styles.button}
        onClick={toggleSeeRules}
        priority={BUTTON_PRIORITY.LINK}
      >
        {buttonText}
        <Icon
          className={styles.icon}
          iconName="arrow-expand"
        />
      </Button>
    </div>
  )
}

Rules.propTypes = {
  // required props
  buttonText: PropTypes.string.isRequired,
  setIsOpened: PropTypes.func.isRequired,
  isOpened: PropTypes.bool.isRequired,
  // container props
  // optional props
}

export default React.memo(Rules)
