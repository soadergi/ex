import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import UserAvatarLegacy from 'weplay-components/UserAvatarLegacy'
import Link from 'weplay-components/Link'
import Icon from 'weplay-components/Icon'

import container from './container'
import styles from './styles.scss'

const isClosed = false // TODO: Fires when voting is closed
const Candidate = ({
  candidate,
  i18nTexts,
  hasStage2,
  isEditorPick,
}) => {
  const hasVoted = candidate.voted || false
  const tab = candidate.videoUrl ? 'video' : 'essay'

  return (
    <div
      className={
        classNames(
          styles.card,
          {
            [styles.hasStage2]: hasStage2,
            [styles.hasVoted]: hasVoted,
            [styles.isClosed]: isClosed,
            [styles.EditorChoice]: isEditorPick,
          },
        )
      }
    >
      <UserAvatarLegacy
        avatar={candidate.pictureUrl}
        className={styles.avatar}
      />

      <p className={styles.name}>{candidate.title}</p>

      <div className={styles.votes}>
        <p className={styles.votesIcon}>
          <Icon
            iconName="check-outlined"
            className={styles.icon}
          />
        </p>

        <p className={styles.votesText}>
          {candidate.votesCount
            ? `${candidate.votesCount}${i18nTexts.voting.candidates.votes}`
            : `${i18nTexts.voting.candidates.notVoted}`}
        </p>
      </div>
      <Link
        to={`/votings/${candidate.votingId}/candidates/${candidate.id}?tabId=${tab}`}
        className={styles.essay}
      >
        {i18nTexts.voting.candidates[tab]}
      </Link>
    </div>
  )
}

Candidate.propTypes = {
  candidate: PropTypes.shape({
    id: PropTypes.number.isRequired,
    voted: PropTypes.bool.isRequired,
    videoUrl: PropTypes.string.isRequired,
    votingId: PropTypes.number.isRequired,
    pictureUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    votesCount: PropTypes.number.isRequired,
    nextVoteDatetime: PropTypes.string,
    callerCanVote: PropTypes.bool.isRequired,
    description: PropTypes.string,
  }).isRequired,
  i18nTexts: PropTypes.shape({}).isRequired,
  hasStage2: PropTypes.bool,
  isEditorPick: PropTypes.bool,
}

Candidate.defaultProps = {
  hasStage2: true,
  isEditorPick: false,
}

export default container(Candidate)
