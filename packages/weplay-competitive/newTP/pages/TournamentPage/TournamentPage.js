import React from 'react'

import { useParams } from 'weplay-singleton/RouterProvider/useParams'

import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES } from 'weplay-core/routes'

import PageHelmet from 'weplay-components/PageHelmet'

import useDiscipline from 'weplay-competitive/hooks/useDiscipline'
import Wrapper from 'weplay-competitive/components/Wrapper'

import TournamentProfile from './TournamentProfile/TournamentProfile'
import { useTournament } from './useTournament'
import styles from './TournamentPage.scss'
import ShortTournamentInfo from './ShortTournamentInfo/ShortTournamentInfo'
import ServerRegion from './ServerRegion/ServerRegion'
import Sponsors from './Sponsors/Sponsors'
import AboutTournament from './AboutTournament/AboutTournament'
import MapsOrHeroesPool from './MapsOrHeroesPool/MapsOrHeroesPool'
import Description from './Description/Description'
import Participants from './Participants/Participants'

const wrapperModification = ['content']
export const TournamentPage = ({
  // required props
  // container props
  // optional props
}) => {
  const { tournamentId } = useParams()
  const { disciplineName } = useDiscipline()
  const tournament = useTournament(tournamentId)
  // TODO: @Tetiana add logic
  const showServerRegion = true

  const seoParams = {
    tournamentName: tournament?.name ?? '',
    discipline: disciplineName,
  }
  const sponsors = tournament?.sponsors ?? []

  if (!tournament) {
    return null
  }
  return (
    <div
      className={styles.page}
      data-event-amplitude-source="Tournament details"
      data-qa-id={dataQaIds.pages[NAMES.TOURNAMENT].container}
    >
      <>
        <PageHelmet
          seoParams={seoParams}
          ogImage={tournament.backgroundAvatar}
        />
        <TournamentProfile
          background={tournament?.backgroundAvatar ?? ''}
        />

        <div className={styles.content}>
          <div className={styles.wrapper}>
            <Wrapper>
              <Wrapper modifiers={wrapperModification}>
                <h1 className={styles.header}>{tournament?.name ?? ''}</h1>
              </Wrapper>
            </Wrapper>
          </div>

          {/* TODO: @Tetiana finish ShortTournamentInfo */}
          <ShortTournamentInfo />

          <div id="sponsors">
            {/* TODO: @Tetiana finish Sponsors */}
            <Sponsors
              sponsors={sponsors}
            />
          </div>

          {showServerRegion && (
            <ServerRegion region={tournament?.region} />
          )}
          {/* TODO: @Tetiana finish all components below */}
          <div id="about">
            <AboutTournament />
          </div>
          <div id="pool">
            <MapsOrHeroesPool />
          </div>
          <div id="description">
            <Description />
          </div>
          <div id="participants">
            <Participants />
          </div>
        </div>
        {/* TODO: @Tetiana add Bracket component here */}
      </>
    </div>
  )
}
export default React.memo(TournamentPage)
