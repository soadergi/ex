import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import historyPropType from 'weplay-core/customPropTypes/historyPropType'
import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'

import Image from 'weplay-components/Image'
import Link from 'weplay-components/Link'
import BackgroundFullWidth from 'weplay-components/BackgroundFullWidth'

import { getMiniGamesSocketUrl } from 'weplay-mini-games/helpers/getMiniGamesSocketUrl'
import { useMiniGame } from 'weplay-mini-games/hooks/useMiniGame'
import { useMiniGameHighScore } from 'weplay-mini-games/hooks/useMiniGameHighScore'
import { useMiniGamePaths } from 'weplay-mini-games/hooks/useMiniGamePaths'
import { getSectionStates } from 'weplay-mini-games/helpers/getSectionStates'
import matchPropType from 'weplay-mini-games/customPropTypes/matchPropType'
import SectionSeoHead from 'weplay-mini-games/components/SectionSeoHead/SectionSeoHead'
import DailyLeaderboardSection from 'weplay-mini-games/components/DailyLeaderboardSection/DailyLeaderboardSection'
import GlobalLeaderboardSection from 'weplay-mini-games/components/GlobalLeaderboardSection/GlobalLeaderboardSection'
import GameMenu from 'weplay-mini-games/components/GameMenu/GameMenu'
import UserAuthControls from 'weplay-mini-games/components/UserAuthControls/UserAuthControls'
import GameInfo from 'weplay-mini-games/components/GameInfo/GameInfo'
import GameBanner from 'weplay-mini-games/components/GameBanner/GameBanner'
import GameFooter from 'weplay-mini-games/components/GameFooter/GameFooter'

import styles from './styles.scss'
import { useGame2048Page } from './container'
import { GAME_LEGAL_SLUG, IMAGES } from './config'
import ScoreContainer from './ScoreContainer'
import GameBody from './GameBody'
import PrizeSection from './PrizeSection/PrizeSection'
import HintPopup from './HintPopup/HintPopup'

const Game2048Page = ({ history, match }) => {
  const currentSection = match.params.section
  const game = useMiniGame(history.location.pathname)
  const paths = useMiniGamePaths({ game, pageName: NAMES.GAME_2048 })

  const {
    isGamePath,
    isDailyLadderPath,
    isGlobalLadderPath,
    isPrizesPath,
  } = getSectionStates({
    currentSection,
    paths,
  })

  const {
    isMobileWidth,
    currentScore,
    setCurrentScore,
    ogImage,
  } = useGame2048Page()

  const t = useTranslation()

  const { highScore } = useMiniGameHighScore({ gameId: game.id })
  const socketUrl = getMiniGamesSocketUrl({ gameEngineName: 'game2048', gameId: game.id })

  // TODO: @Andrew, move all tournaments slugs to general config and use everywhere
  const eventLink = pathWithParamsByRoute(NAMES.EVENT_PAGE, {
    tournamentDiscipline: 'dota-2',
    tournamentSlug: 'we-play-pushka-league',
  })
  const tournamentsLink = pathWithParamsByRoute(NAMES.TOURNAMENTS, { discipline: 'dota2' })

  return (
    <div className={styles.block}>
      <SectionSeoHead
        pageName={NAMES.GAME_2048}
        section={currentSection}
        ogImage={ogImage}
      />

      {!isMobileWidth && (
        <BackgroundFullWidth
          src={IMAGES.BG}
          className={styles.background}
        />
      )}
      <div className={styles.header}>
        <div className={styles.header}>
          <Link
            className={styles.logoWrap}
            to={eventLink}
            target="_blank"
          >
            <Image
              src={IMAGES.LOGO}
              alt="logo"
              className={styles.logo}
            />
          </Link>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.gameMenu}>
          <GameMenu {...paths} />
        </div>
        <div className={styles.gameHead}>
          <div className={styles.scoreWrapper}>
            <UserAuthControls />
            <div className={styles.grid}>
              <ScoreContainer
                className={styles.currentScore}
                score={currentScore}
                name={t('mediaCore.game2048.score.current')}
              />
              <ScoreContainer
                score={highScore}
                name={t('mediaCore.game2048.score.best')}
              />
            </div>
          </div>
        </div>

        {isGamePath && (
          <GameBody
            socketUrl={socketUrl}
            setCurrentScore={setCurrentScore}
          />
        )}
        {isGlobalLadderPath && <GlobalLeaderboardSection gameId={game.id} />}
        {isDailyLadderPath && <DailyLeaderboardSection gameId={game.id} />}
        {isPrizesPath && <PrizeSection />}

        <GameInfo
          HintPopup={HintPopup}
          hintLabel={t('mediaCore.game2048.howToPlay')}
        />

        <GameBanner
          title={t('mediaCore.game2048.banner.pushka.title')}
          text={t('mediaCore.game2048.banner.pushka.text')}
          button={t('mediaCore.game2048.banner.pushka.button')}
          link={eventLink}
          image={IMAGES.PUSHKA}
          className={styles.banner}
          imageClassName={styles.eventBannerImage}
        />

        <GameBanner
          title={t('mediaCore.game2048.banner.tournamentsList.title')}
          text={t('mediaCore.game2048.banner.tournamentsList.text')}
          button={t('mediaCore.game2048.banner.tournamentsList.button')}
          link={tournamentsLink}
          image={IMAGES.TOURNAMENTS}
          className={styles.banner}
          imageClassName={styles.tournamentBannerImage}
        />

        <GameFooter
          gameLegalSlug={GAME_LEGAL_SLUG}
          infoText={t('mediaCore.game2048.footer.inspired')}
          color="blue"
        />
      </div>
    </div>
  )
}

Game2048Page.propTypes = {
  history: historyPropType.isRequired,
  match: matchPropType.isRequired,
}

export default Game2048Page
