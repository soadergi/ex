import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import BackgroundImg from 'weplay-components/BackgroundImg'
import Label from 'weplay-components/Label'

import Wrapper from 'weplay-competitive/components/Wrapper'
import { DISCORD_LINK } from 'weplay-competitive/constants/externalLinks'
import { DISCIPLINE_NAME_CSGO } from 'weplay-competitive/config/disciplines'
import useDiscipline from 'weplay-competitive/hooks/useDiscipline'
import { MMMatchesSelectors } from 'weplay-competitive/reduxs/MMMatches'
import MMButton from 'weplay-competitive/components/MM/MMButton'

import Tooltip from './Tooltip/Tooltip'
import MatchScore from './MatchScore/MatchScore'
import PlayButton from './PlayButton/PlayButton'
import LobbyLink from './LobbyLink/LobbyLink'
import VotingInfo from './VotingInfo/VotingInfo'
import MatchMember from './MatchMember/MatchMember'
import styles from './MatchHeader.scss'
import useIsMMMatchAvailable from './useIsMMMatchAvailable'

const labelWarning = 'warning'

const MatchHeader = ({
  matchId,
}) => {
  const t = useTranslation()

  const match = useSelector(
    MMMatchesSelectors.createRecordByIdSelector(matchId),
  )

  const { tournamentDiscipline, disciplineName } = useDiscipline()

  const backgroundSrc = tournamentDiscipline.backgrounds.matchHeaderBackground

  const isMMMatchAvailable = useIsMMMatchAvailable(matchId)

  const {
    teamLeft: [memberLeft],
    teamRight: [memberRight],
  } = match

  // TODO: @rbogdanov update plz
  const isSpectatorLinkShown = false
  const isDiscordLinkShown = true

  return (
    <div className={styles.block}>
      <BackgroundImg
        src={backgroundSrc}
      />

      <Wrapper className="u-pb-3">
        <div
          className={styles.grid}
          data-event-amplitude-source="Game Lobby"
        >
          <div className={styles.discord}>
            <Label color={labelWarning}>
              {t(`competitive.match.warnings.${match.status}`)}
            </Label>
          </div>

          <div className={styles.user}>
            <MatchMember memberId={memberLeft.id} />
          </div>

          <div className={styles.score}>
            {(isDiscordLinkShown || isSpectatorLinkShown) && (
            <div className={styles.links}>
              {isDiscordLinkShown && (
              <LobbyLink
                icon="discord-contained"
                lobbyLink={DISCORD_LINK}
                text={t('competitive.match.headerLinks.discord')}
                className={styles.lobbyLink}
              />
              )}
              {isSpectatorLinkShown && (
              <LobbyLink
                icon="spectate"
                lobbyLink={`${tournamentDiscipline.runCommand}${match?.matchLink ?? ''}`}
                text={t('competitive.match.headerLinks.watch')}
                className={styles.lobbyLink}
              />
              )}
            </div>
            )}
            <MatchScore
              match={match}
            />
          </div>

          <div className={styles.user}>
            <MatchMember memberId={memberRight.id} />
          </div>

          <div className={styles.button}>
            {isMMMatchAvailable
              ? (
                <PlayButton
                  joinMatchLink={match.matchLink}
                  matchId={matchId}
                />
              )
              : <MMButton />}
          </div>
        </div>

      </Wrapper>
      <VotingInfo
        matchId={matchId}
        gameModeId={match.gameModeId}
      />
      {disciplineName === DISCIPLINE_NAME_CSGO && <Tooltip />}
    </div>
  )
}

MatchHeader.propTypes = {
  matchId: PropTypes.number.isRequired,
}

MatchHeader.defaultProps = {
  // optional props
}

export default MatchHeader
