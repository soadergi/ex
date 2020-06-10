import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'

import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES } from 'weplay-core/routes'

import PageHelmet from 'weplay-components/PageHelmet'
import LazyDiv from 'weplay-components/LazyDiv'

import Wrapper from 'weplay-competitive/components/Wrapper'
import tournamentParticipantsPropType from 'weplay-competitive/customPropTypes/tournamentParticipantsPropType'
import rewardPropType from 'weplay-competitive/customPropTypes/rewardPropType'
import EmptyState from 'weplay-competitive/components/EmptyState'
import sponsorProptype from 'weplay-competitive/customPropTypes/sponsorPropType'
import tournamentPropType from 'weplay-competitive/customPropTypes/tournamentPropType'
import { TOURNAMENT_STATUSES } from 'weplay-competitive/constants/tournamentStatuses'
import { DISCIPLINE_NAME_CSGO } from 'weplay-competitive/config/disciplines'

import ServerRegion from './ServerRegion'
import Sponsors from './Sponsors'
import TournamentProfile from './TournamentProfile/TournamentProfile'
import ShortTournamentInfo from './ShortTournamentInfo'
import DescriptionTournament from './DescriptionTournament'
import AboutTournament from './AboutTournament'
import TournamentParticipants from './TournamentParticipants'
import BracketsBlock from './BracketsBlock'
import MapsOrHeroesPool from './MapsOrHeroesPool'
import DynamicPrize from './DynamicPrize'
import PrizeTable from './PrizeTable'
import styles from './styles.scss'
import container from './container'

const wrapperModification = ['content']

const TournamentPage = ({
  // required props
  // props from container
  t,
  currentTournament,
  tournamentParticipants,
  queryTournamentAllInfo,
  seoParams,
  showBracket,
  isCurrentMemberHasAccessToTournament,
  totalRewards,
  distributedRewards,
  sponsors,
  scrollSpySections,
  isFetchedTournamentInfo,
  // optional props
  // props from HOCs
  discipline,
}) => {
  const showServerRegion = discipline === DISCIPLINE_NAME_CSGO && (
    currentTournament.status === TOURNAMENT_STATUSES.UPCOMING
    || currentTournament.status === TOURNAMENT_STATUSES.ONGOING
  )

  return (
    <div
      className={styles.page}
      data-event-amplitude-source="Tournament details"
      data-qa-id={dataQaIds.pages[NAMES.TOURNAMENT].container}
    >
      <>
        <PageHelmet
          seoParams={seoParams}
          ogImage={currentTournament.backgroundAvatar}
        />

        <TournamentProfile
          tournament={currentTournament}
        />

        <div className={styles.content}>
          <div className={styles.wrapper}>
            <Wrapper>
              <Wrapper modifiers={wrapperModification}>
                <h1 className={styles.header}>{currentTournament.name}</h1>
              </Wrapper>
            </Wrapper>
          </div>

          <ShortTournamentInfo
            currentTournament={currentTournament}
            queryTournamentAllInfo={queryTournamentAllInfo}
            isCurrentMemberHasAccessToTournament={isCurrentMemberHasAccessToTournament}
            scrollSpySections={scrollSpySections}
            isFetchedTournamentInfo={isFetchedTournamentInfo}
          />

          {!R.isEmpty(sponsors) && (
          <div id="sponsors">
            <Sponsors
              sponsors={sponsors}
            />
          </div>
          )}

          {showServerRegion && (
            <ServerRegion region={currentTournament.serversRegion.name} />
          )}

          {(totalRewards && !!totalRewards.length) && (
          <div id="rewards">
            <DynamicPrize
              totalRewards={totalRewards}
              currentTournament={currentTournament}
            />
            <PrizeTable
              totalRewards={totalRewards}
              distributedRewards={distributedRewards}
              currentTournament={currentTournament}
              className={styles.table}
            />
          </div>
          )}

          <div id="about">
            <AboutTournament
              tournament={currentTournament}
            />
          </div>

          <div id="pool">
            <MapsOrHeroesPool
              tournament={currentTournament}
              discipline={discipline}
            />
          </div>

          {currentTournament.description && (
          <div id="description">
            <DescriptionTournament
              title={t('competitive.tournament.description.title')}
              text={currentTournament.description}
            />
          </div>
          )}

          <div id="participants">
            {currentTournament.isFetched && (
              R.isEmpty(tournamentParticipants) ? (
                <Wrapper>
                  <Wrapper modifiers={wrapperModification}>
                    <div className="u-py-6">
                      <EmptyState
                        text={t('competitive.tournament.tournamentTeam.noTeams')}
                        avatar=""
                        isHorizontal
                      />
                    </div>
                  </Wrapper>
                </Wrapper>
              ) : (
                <LazyDiv>
                  <TournamentParticipants
                    tournamentParticipants={tournamentParticipants}
                    tournament={currentTournament}
                  />
                </LazyDiv>
              )
            )}
          </div>
        </div>

        {showBracket && (
        <div id="bracketsSection">
          <LazyDiv>
            <BracketsBlock />
          </LazyDiv>
        </div>
        )}
      </>
    </div>
  )
}

TournamentPage.propTypes = {
  currentTournament: tournamentPropType.isRequired,
  t: PropTypes.func.isRequired,
  tournamentParticipants: PropTypes.arrayOf(tournamentParticipantsPropType).isRequired,
  queryTournamentAllInfo: PropTypes.func.isRequired,
  seoParams: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  showBracket: PropTypes.bool.isRequired,
  isCurrentMemberHasAccessToTournament: PropTypes.bool.isRequired,
  totalRewards: PropTypes.arrayOf(
    rewardPropType,
  ).isRequired,
  distributedRewards: PropTypes.arrayOf(
    rewardPropType,
  ).isRequired,
  sponsors: PropTypes.arrayOf(sponsorProptype).isRequired,
  scrollSpySections: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      href: PropTypes.string,
      rendered: PropTypes.bool,
    }),
  ).isRequired,
  isFetchedTournamentInfo: PropTypes.bool.isRequired,
  // props from HOCs
  discipline: PropTypes.string.isRequired,
}

export default container(TournamentPage)
