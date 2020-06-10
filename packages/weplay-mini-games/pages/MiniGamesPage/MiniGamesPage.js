import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES } from 'weplay-core/routes'

import PageHelmet from 'weplay-components/PageHelmet'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import Breadcrumbs from 'weplay-components/Breadcrumbs'
import GridTile from 'weplay-components/GridTile/GridTile'

import Hero from 'weplay-mini-games/components/Hero'

import MiniGamesCard from './MiniGamesCard/MiniGamesCard'
import { useMiniGames } from './useMiniGames'

const MiniGamesPage = (
) => {
  const { miniGames } = useMiniGames()
  const t = useTranslation()

  return (
    <>
      <Hero title={t('mediaCore.miniGames.title')} />
      <div className="u-my-4">
        <ContentContainer>
          <PageHelmet lokaliseProject="mediaCore" />
          <Breadcrumbs
            entityName={t('mediaCore.miniGames.breadcrumbs.title')}
          />
          <GridTile>
            {miniGames.map(game => (
              <MiniGamesCard
                key={game.id}
                game={game}
              />
            ))}
          </GridTile>
        </ContentContainer>
        <div data-qa-id={dataQaIds.pages[NAMES.MINI_GAMES].container} />
      </div>
    </>
  )
}

export default MiniGamesPage
