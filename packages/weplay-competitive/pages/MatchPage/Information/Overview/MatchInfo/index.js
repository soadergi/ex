import React from 'react'
import classNames from 'classnames'
import R from 'ramda'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Link from 'weplay-components/Link'
import Icon from 'weplay-components/Icon'
import Label from 'weplay-components/Label'

import { LOBBY_MAP_VOTES } from 'weplay-competitive/constants/lobbyMapVotes'
import { MATCH_MEMBER_PARTICIPATION_TYPES } from 'weplay-competitive/constants/matchMemberParticipationTypes'
import MatchResultPropType from 'weplay-competitive/customPropTypes/matchResultPropType'
import Score from 'weplay-competitive/pages/MatchPage/Information/Overview/MatchInfo/Score'
import { DISCIPLINES } from 'weplay-competitive/config/disciplines'

import styles from './styles.scss'

const labelModificationMagenta = 'magenta'
const labelModificationSuccess = 'success'

const MatchInfo = ({
  // required props
  record,
  index,
  discipline,

  // optional props
}) => {
  const t = useTranslation()

  return (
    <div
      className={styles.block}
    >
      <div className={styles.info}>
        <p className={styles.title}>
          {t('competitive.match.matchInfo.title')}
          {' '}
          {index + 1}
        </p>
        <div className={styles.score}>
          <Score
            score={R.isEmpty(record.round.score1) ? 0 : record.round.score1}
            isWinner={record.winner === MATCH_MEMBER_PARTICIPATION_TYPES.HOME}
            isRoundInProgress={record.isRoundInProgress}
          />
          <Icon
            className={styles.icon}
            size="small"
            iconName="halfMainLogo"
          />
          <Score
            score={R.isEmpty(record.round.score2) ? 0 : record.round.score2}
            isWinner={record.winner === MATCH_MEMBER_PARTICIPATION_TYPES.AWAY}
            isRoundInProgress={record.isRoundInProgress}
          />
        </div>
        <Link
          to="/" // TODO: Link to stats
          onClick={e => e.preventDefault()} // TODO: Remove this after link is ready
          className={styles.stats}
        >
          {t('competitive.match.matchInfo.stats')}
        </Link>
      </div>
      <div className={styles.choice}>
        {record.lobbyMap.isFetched && (
          <>
            {!R.isNil(record.lobbyMap.relationships.member) ? (
              <>
                {record.lobbyMap.vote === LOBBY_MAP_VOTES.PICK && (
                <Label
                  className={classNames(
                    {
                      [styles.isAway]: record.isMemberWhoVotedThisMapAway,
                    },
                  )}
                  color={labelModificationSuccess}
                >
                  {t('competitive.match.mapVoting.buttons.PICK')}
                </Label>
                )}
                {record.lobbyMap.vote === LOBBY_MAP_VOTES.DROP && (
                <Label
                  className={classNames(
                    {
                      [styles.isAway]: record.isMemberWhoVotedThisMapAway,
                    },
                  )}
                  color={labelModificationMagenta}
                >
                  {t('competitive.match.mapVoting.buttons.DROP')}
                </Label>
                )}
              </>
            ) : (
              <Icon
                className={styles.server}
                iconName="server"
              />
            )}
          </>
        )}
        <p className={styles.map}>
          {R.isEmpty(record.voteItem)
            ? t(`competitive.match.matchInfo.empty.${DISCIPLINES[discipline]}.pool`)
            : record.voteItem.name}
        </p>
      </div>
    </div>
  )
}

MatchInfo.propTypes = {
  // required props
  record: MatchResultPropType.isRequired,
  index: PropTypes.number.isRequired,
  discipline: PropTypes.string.isRequired,
  // optional props
}

MatchInfo.defaultProps = {
  // optional props
}

export default MatchInfo
