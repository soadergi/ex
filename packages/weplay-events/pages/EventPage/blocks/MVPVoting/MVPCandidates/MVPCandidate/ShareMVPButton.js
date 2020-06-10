import React, { useState, useCallback } from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Button, { BUTTON_PRIORITY, BUTTON_SIZE } from 'weplay-components/Button'
import Icon from 'weplay-components/Icon'

import MVPSharePopup from '../MVPSharePopup/MVPSharePopup'

import styles from './MVPCandidate.scss'

const ShareMVPButton = () => {
  const t = useTranslation()
  const [isOpened, setIsOpened] = useState(false)
  const toggleShareVisible = useCallback(() => setIsOpened(isOpen => !isOpen), [])

  return (
    <>
      <p className={styles.textVoted}>
        <Icon
          size="small"
          iconName="check"
          className={styles.iconVoted}
        />

        {t('events.MVPVotingBanner.MVPCandidates.buttonHasVoted')}

        <Button
          priority={BUTTON_PRIORITY.RESET}
          size={BUTTON_SIZE.SM}
          type="button"
          className={styles.buttonShare}
          onClick={toggleShareVisible}
        >
          <span className={styles.textShare}>{t('events.MVPVotingBanner.MVPCandidates.buttonShare')}</span>
        </Button>
      </p>

      {isOpened && <MVPSharePopup toggleShareVisible={toggleShareVisible} />}
    </>
  )
}

export default React.memo(ShareMVPButton)
