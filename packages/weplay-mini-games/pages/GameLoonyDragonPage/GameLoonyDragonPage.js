import React from 'react'
import classNames from 'classnames'

import historyPropType from 'weplay-core/customPropTypes/historyPropType'
import { NAMES } from 'weplay-core/routes'

import SectionSeoHead from 'weplay-mini-games/components/SectionSeoHead/SectionSeoHead'
import DailyLeaderboardSection from 'weplay-mini-games/components/DailyLeaderboardSection/DailyLeaderboardSection'
import GlobalLeaderboardSection from 'weplay-mini-games/components/GlobalLeaderboardSection/GlobalLeaderboardSection'
import UserAuthControls from 'weplay-mini-games/components/UserAuthControls/UserAuthControls'
import EventInfo from 'weplay-mini-games/components/EventInfo/EventInfo'
import GameInfo from 'weplay-mini-games/components/GameInfo/GameInfo'
import GameFooter from 'weplay-mini-games/components/GameFooter/GameFooter'
import GameMenu from 'weplay-mini-games/components/GameMenu/GameMenu'
import { useMiniGame } from 'weplay-mini-games/hooks/useMiniGame'
import { useMiniGamePaths } from 'weplay-mini-games/hooks/useMiniGamePaths'
import { getSectionStates } from 'weplay-mini-games/helpers/getSectionStates'
import matchPropType from 'weplay-mini-games/customPropTypes/matchPropType'

import styles from './GameLoonyDragonPage.scss'
import ParallaxBackground from './ParallaxBackground/ParallaxBackground'
import { useGameLoonyDragonPage } from './useGameLoonyDragonPage'
import { GAME_LEGAL_SLUG, OG_IMAGE } from './config'
import Header from './Header/Header'
import GameBody from './GameBody/GameBody'
import HintPopup from './HintPopup/HintPopup'

const GameLoonyDragonPage = ({ history, match }) => {
  const currentSection = match.params.section
  const {
    t,
    // botLinks,
    eventLink,
  } = useGameLoonyDragonPage({ history })

  const game = useMiniGame(history.location.pathname)
  const paths = useMiniGamePaths({ game, pageName: NAMES.GAME_LOONY_DRAGON })

  const {
    isGamePath,
    isDailyLadderPath,
    isGlobalLadderPath,
  } = getSectionStates({
    currentSection,
    paths,
  })

  return (
    <div className={styles.block}>
      <SectionSeoHead
        pageName={NAMES.GAME_LOONY_DRAGON}
        section={currentSection}
        ogImage={OG_IMAGE}
      />
      <ParallaxBackground />

      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
          <div className={styles.header}>
            <GameMenu {...paths} />
            <div className="u-mt-2">
              <UserAuthControls />
            </div>
          </div>
          <div className={classNames(
            styles.body,
            'u-mb-3',
          )}
          >
            {isGamePath && <GameBody gameId={game.id} />}
            {isGlobalLadderPath && <GlobalLeaderboardSection gameId={game.id} />}
            {isDailyLadderPath && <DailyLeaderboardSection gameId={game.id} />}
          </div>
          <div className={styles.body}>
            <EventInfo
              eventLink={eventLink}
              eventText={t('mediaCore.gameLoonyDragon.eventInfo.visitEvent')}
              botNewsText={t('mediaCore.gameLoonyDragon.eventInfo.botLinks')}
              pageName="LoonyDragon"
              eventIconName="mad-moon"
            />
          </div>
          <GameInfo
            HintPopup={HintPopup}
            hintLabel={t('mediaCore.gameLoonyDragon.hint.label')}
          />
          <GameFooter
            gameLegalSlug={GAME_LEGAL_SLUG}
            color="blue"
          />
        </div>
      </div>
    </div>
  )
}

GameLoonyDragonPage.propTypes = {
  history: historyPropType.isRequired,
  match: matchPropType.isRequired,
}

export default GameLoonyDragonPage
