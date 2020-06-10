import React from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
import { NAMES } from 'weplay-core/routes'
import historyPropType from 'weplay-core/customPropTypes/historyPropType'

import { BUTTON_COLOR } from 'weplay-components/Button'
import BackgroundFullWidth from 'weplay-components/BackgroundFullWidth'
import Link from 'weplay-components/Link'
import Image from 'weplay-components/Image'

import { useMiniGame } from 'weplay-mini-games/hooks/useMiniGame'
import { useMiniGamePaths } from 'weplay-mini-games/hooks/useMiniGamePaths'
import { getSectionStates } from 'weplay-mini-games/helpers/getSectionStates'
import matchPropType from 'weplay-mini-games/customPropTypes/matchPropType'
import SectionSeoHead from 'weplay-mini-games/components/SectionSeoHead/SectionSeoHead'
import GameMenu from 'weplay-mini-games/components/GameMenu/GameMenu'
import UserAuthControls from 'weplay-mini-games/components/UserAuthControls/UserAuthControls'
import GlobalLeaderboardSection from 'weplay-mini-games/components/GlobalLeaderboardSection/GlobalLeaderboardSection'
import DailyLeaderboardSection from 'weplay-mini-games/components/DailyLeaderboardSection/DailyLeaderboardSection'
import GameInfo from 'weplay-mini-games/components/GameInfo/GameInfo'
import GameBanner from 'weplay-mini-games/components/GameBanner/GameBanner'
import GameFooter from 'weplay-mini-games/components/GameFooter/GameFooter'

import { IMAGES, GAME_LEGAL_SLUG } from './config'
import GameSection from './GameSection/GameSection'
import styles from './GameMatchUpPage.scss'
import { useMatchUpLinks } from './useMatchUpLinks'
import PrizeSection from './PrizeSection/PrizeSection'
import HintPopup from './HintPopup/HintPopup'

const GameMatchUpPage = ({ history, match }) => {
  const isMobileWidth = useSelector(isMobileWidthSelector)
  const currentSection = match.params.section

  const t = useTranslation()
  const game = useMiniGame(history.location.pathname)
  const paths = useMiniGamePaths({ game, pageName: NAMES.GAME_MATCH_UP })

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
    eventLink,
    tournamentsLink,
    ogImage,
  } = useMatchUpLinks()

  return (
    <div className={styles.block}>
      <SectionSeoHead
        pageName={NAMES.GAME_MATCH_UP}
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
        <Image
          src={IMAGES.HEADER_DECOR}
          alt="logo"
          className={styles.chain}
        />
        <Link
          className={styles.logoWrap}
          to={eventLink}
          isExternal
        >
          <Image
            src={IMAGES.LOGO}
            alt="logo"
            className={styles.logo}
          />
        </Link>
        <Image
          src={IMAGES.HEADER_DECOR}
          alt="logo"
          className={styles.chain}
        />
      </div>

      <div className={styles.content}>
        <GameMenu
          className={styles.wrapper}
          {...paths}
        />
        <UserAuthControls className={styles.wrapper} />

        {game.id && (
          <GameSection
            gameId={game.id}
            isGameActive={isGamePath}
          />
        )}
        {isGlobalLadderPath && <GlobalLeaderboardSection gameId={game.id} />}
        {isDailyLadderPath && <DailyLeaderboardSection gameId={game.id} />}
        {isPrizesPath && <PrizeSection />}

        <GameInfo
          HintPopup={HintPopup}
          hintLabel={t('mediaCore.miniGames.hint.label')}
        />

        <GameBanner
          title={t('mediaCore.gameMatchUp.banners.tournaments.title')}
          text={t('mediaCore.gameMatchUp.banners.event.text')}
          button={t('mediaCore.miniGames.buttons.tournaments')}
          link={tournamentsLink}
          image={IMAGES.TOURNAMENTS}
          className={styles.banner}
          imageClassName={classNames(
            styles.tournament,
            styles.image,
          )}
          buttonColor={BUTTON_COLOR.BASIC}
        />

        <GameBanner
          title={t('mediaCore.gameMatchUp.banners.event.title')}
          text={t('mediaCore.gameMatchUp.banners.event.text')}
          button={t('mediaCore.miniGames.buttons.event')}
          link={eventLink}
          image={IMAGES.EVENT}
          className={styles.banner}
          imageClassName={classNames(
            styles.event,
            styles.image,
          )}
          buttonColor={BUTTON_COLOR.BASIC}
        />

        <GameFooter
          gameLegalSlug={GAME_LEGAL_SLUG}
          color="blue"
        />
      </div>
    </div>
  )
}

GameMatchUpPage.propTypes = {
  history: historyPropType.isRequired,
  match: matchPropType.isRequired,
}

export default GameMatchUpPage
