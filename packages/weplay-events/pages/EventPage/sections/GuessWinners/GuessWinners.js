import React, { useState } from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'

import ConnectTwitchModal from './modals/ConnectTwitchModal/ConnectTwitchModal'
import ConnectTwitchBanner from './components/ConnectTwitchBanner/ConnectTwitchBanner.js'
import GiftsBanner from './components/GiftsBanner/GiftsBanner'
import Predictions from './components/Predictions/Predictions'

const steamImgUrl = 'https://static-prod.weplay.tv/2020-04-13/11494b21013cfec54c91c0bcbc68ca9b.png'

const GuessWinners = () => {
  const t = useTranslation()
  const [isModalOpened, setIsModalOpened] = useState(false)

  return (
    <>
      <GiftsBanner
        title={t('events.giftsBanner.title')}
        description={t('events.giftsBanner.description')}
        imageSrc={steamImgUrl}
      />

      <Predictions setIsModalOpened={setIsModalOpened} />

      <ConnectTwitchBanner setIsModalOpened={setIsModalOpened} />

      <ConnectTwitchModal
        isShown={isModalOpened}
        handleClose={() => setIsModalOpened(false)}
      />
    </>
  )
}

export default React.memo(withPageViewAnalytics()(GuessWinners))
