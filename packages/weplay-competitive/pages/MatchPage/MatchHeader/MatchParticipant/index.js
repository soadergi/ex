import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'
import transliterate from 'weplay-core/helpers/translit'
import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'

import Link from 'weplay-components/Link'

import matchParticipantPropType from 'weplay-competitive/customPropTypes/matchParticipantPropType'
import container from 'weplay-competitive/pages/MatchPage/MatchHeader/MatchParticipant/container'
import MatchUser from 'weplay-competitive/pages/MatchPage/MatchHeader/MatchParticipant/MatchUser'
import Status from 'weplay-competitive/components/Status'
import { AT__TEAM_DETAILS, AT__USER_DETAILS } from 'weplay-competitive/analytics/amplitude'
import gameModePropType from 'weplay-competitive/customPropTypes/gameModePropType'
import { GAME_MODE_TYPES } from 'weplay-competitive/constants/gameModeTypes'

import styles from './styles.scss'

const MatchParticipant = ({
  // required props
  isParticipantActive,
  countOnline,
  // container props
  participant,
  gameMode,
  // props from HOCs
  discipline,
  // optional props
}) => {
  const t = useTranslation()

  return (
    <>
      {participant.id ? (
        <Link
          to={pathWithParamsByRoute(
            NAMES[participant.type.toUpperCase()],
            {
              memberId: participant.id,
              memberName: transliterate(participant.name),
              teamId: participant.id,
              teamName: transliterate(participant.name),
              discipline,
            },
          )}
          target="_blank"
          className={styles.wrapper}
          {...getAnalyticsAttributes({
            'amplitude-action': gameMode.gameModeType === GAME_MODE_TYPES.SINGLE
              ? AT__USER_DETAILS
              : AT__TEAM_DETAILS,
            'amplitude-discipline': discipline,
            'amplitude-source': LOOKUP,
          })}
        >
          <MatchUser
            participantAvatar={participant.avatar}
            participantName={participant.name}
            isActive={isParticipantActive}
            isPremiumAccount={participant.isPremiumAccount}
          />
        </Link>
      ) : (
        <div className={styles.wrapper}>
          <MatchUser
            participantAvatar={participant.avatar}
            participantName={participant.name}
            isActive={isParticipantActive}
            isPremiumAccount={participant.isPremiumAccount}
          />
        </div>
      )}
      <Status
        isWarning={!isParticipantActive}
        isSuccess={isParticipantActive}
      >
        {isParticipantActive
          ? t('competitive.match.warnings.ready')
          : t('competitive.match.warnings.notReady')}
        {participant.type === 'Team'
        && ` • ${countOnline} ${t('competitive.match.warnings.online')}`}
      </Status>
    </>
  )
}

MatchParticipant.propTypes = {
  // required props
  countOnline: PropTypes.number.isRequired,
  // container props
  isParticipantActive: PropTypes.bool.isRequired,
  participant: matchParticipantPropType.isRequired,
  gameMode: gameModePropType.isRequired,
  // props from HOCs
  discipline: PropTypes.string.isRequired,
  // optional props
}

MatchParticipant.defaultProps = {
  // optional props
}

export default container(MatchParticipant)
