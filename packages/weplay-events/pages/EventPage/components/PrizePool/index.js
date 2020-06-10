import React, {
  useState,
  useCallback,
} from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import PrizePoolPopup from 'weplay-events/pages/EventPage/components/PrizePoolPopup'

import styles from '../EventHeroSection/styles.scss'

const PrizePool = () => {
  const t = useTranslation()
  const [isShown, setIsShown] = useState(false)
  const togglePrizePoolPopupVisibility = useCallback(
    () => setIsShown(!isShown),
    [isShown, setIsShown],
  )

  return (
    <>
      <button
        type="button"
        className={styles.button}
        onClick={togglePrizePoolPopupVisibility}
      >
        {t('events.prizePoolPopup.button')}
      </button>

      {isShown && <PrizePoolPopup togglePrizePoolPopupVisibility={togglePrizePoolPopupVisibility} />}
    </>
  )
}

export default PrizePool
