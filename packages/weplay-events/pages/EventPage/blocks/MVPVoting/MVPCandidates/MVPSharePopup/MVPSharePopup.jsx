import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Button, { BUTTON_COLOR, BUTTON_PRIORITY } from 'weplay-components/Button'
import ShareBlock from 'weplay-components/ShareBlock/ShareBlock'

import styles from './MVPSharePopup.scss'

const MVPSharePopup = ({
  toggleShareVisible,
}) => {
  const t = useTranslation()

  return (
    <div
      className={styles.block}
    >
      <p className={styles.title}>
        {t('events.MVPVotingBanner.MVPSharePopup.title')}
      </p>

      <p className={styles.text}>
        {t('events.MVPVotingBanner.MVPSharePopup.text')}
      </p>

      <ShareBlock
        color="isMultiColored"
        className={styles.share}
      />

      <div className={styles.wrap}>
        <Button
          color={BUTTON_COLOR.BASIC}
          priority={BUTTON_PRIORITY.SECONDARY}
          type="button"
          onClick={toggleShareVisible}
        >
          {t('events.MVPVotingBanner.MVPSharePopup.button')}
        </Button>
      </div>
    </div>
  )
}

MVPSharePopup.propTypes = {
  toggleShareVisible: PropTypes.func.isRequired,
}

export default React.memo(MVPSharePopup)
