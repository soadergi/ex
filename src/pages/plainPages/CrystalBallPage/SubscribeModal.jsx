import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { capitalizeFirstLetter } from 'weplay-core/helpers/capitalizeFirstLetter'
import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'
import { bukovelMinorBotLinksByLanguage } from 'weplay-core/consts/bukovelMinorConfig'
import Link from 'weplay-components/Link'
import Icon from 'weplay-components/Icon'
import ModalBase from 'weplay-components/ModalBase'
import Button, { BUTTON_PRIORITY } from 'weplay-components/Button'

import styles from './styles.scss'

const SubscribeModal = ({
  handleSubscription,
  handleAnimation,
  handleClose,
  isShown,
}) => {
  const t = useTranslation()
  const { locale } = useLocale()
  const clickHandler = () => {
    handleAnimation()
    handleClose()
  }
  const botLinks = useMemo(() => bukovelMinorBotLinksByLanguage[locale], [locale])

  return (
    <ModalBase
      isShown={isShown}
      handleClose={handleClose}
    >
      <div className={styles.modal}>
        <p className={styles.modalTitle}>
          {t('mediaCore.crystalBall.subscriptionModal.title')}
        </p>
        <p className={styles.modalText}>
          {t('mediaCore.crystalBall.subscriptionModal.textTwo')}
        </p>
        <p className={styles.modalText}>
          {t('mediaCore.crystalBall.subscriptionModal.text')}
        </p>

        {botLinks.map(botLink => (
          <Link
            className={classNames(
              styles.button,
              styles[botLink.name],
            )}
            to={botLink.url}
            onClick={handleSubscription}
            {...getAnalyticsAttributes({
              category: 'Social',
              action: `Join ${capitalizeFirstLetter(botLink.name)} channel`,
              position: 'subscribeModal',
            })}
          >
            <Icon
              className={styles.icon}
              iconName={botLink.iconName}
              size="medium"
            />
            {t(`mediaCore.crystalBall.subscriptionModal.${botLink.name}`)}
          </Link>
        ))}

        <div className={styles.divider} />
        <Button
          priority={BUTTON_PRIORITY.RESET}
          icon="load-more"
          onClick={clickHandler}
          className={styles.link}
        >
          {t('mediaCore.crystalBall.subscriptionModal.repeat')}
        </Button>
      </div>
    </ModalBase>
  )
}

SubscribeModal.propTypes = {
  handleSubscription: PropTypes.func.isRequired,
  handleAnimation: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  isShown: PropTypes.bool.isRequired,
}

export default SubscribeModal
