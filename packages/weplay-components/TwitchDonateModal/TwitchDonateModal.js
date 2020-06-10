import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import ModalBase from 'weplay-components/ModalBase'
import Link from 'weplay-components/Link'

import styles from './TwitchDonateModal.scss'

const TwitchDonateModal = ({ handleClose }) => {
  const t = useTranslation()

  return (
    <ModalBase
      isShown
      handleClose={handleClose}
    >
      <div className={styles.block}>
        <p className={styles.title}>
          {t('events.eventPage.blocks.charityPlayBlock.twitchDonateModal.title')}
        </p>

        {/* eslint-disable max-len */}
        <div className={styles.content}>
          <p className={styles.subTitle}>{t('events.eventPage.blocks.charityPlayBlock.twitchDonateModal.firstStepTitle')}</p>
          <p className={styles.text}>{t('events.eventPage.blocks.charityPlayBlock.twitchDonateModal.firstStepText')}</p>
          <p className={styles.subTitle}>{t('events.eventPage.blocks.charityPlayBlock.twitchDonateModal.secondStepTitle')}</p>
          <p className={styles.text}>{t('events.eventPage.blocks.charityPlayBlock.twitchDonateModal.secondStepText')}</p>
          <p className={styles.subTitle}>{t('events.eventPage.blocks.charityPlayBlock.twitchDonateModal.thirdStepTitle')}</p>
          <p className={styles.text}>{t('events.eventPage.blocks.charityPlayBlock.twitchDonateModal.thirdStepText')}</p>
        </div>
        {/* eslint-enable max-len */}

        <div className={styles.wrapLinks}>
          <a
            target="_blank"
            rel="noreferrer noopener"
            href={t('events.eventPage.blocks.charityPlayBlock.twitchDonateModal.twitchLink')}
            className={styles.twitchLink}
          >
            {t('events.eventPage.blocks.charityPlayBlock.twitchDonateModal.twitchLinkText')}
          </a>

          <Link
            to="/donate-we-save"
            className={styles.internalLink}
          >
            {t('events.eventPage.blocks.charityPlayBlock.twitchDonateModal.internalLinkText')}
          </Link>
        </div>
      </div>
    </ModalBase>
  )
}

TwitchDonateModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
}

export default TwitchDonateModal
