import React, { useMemo } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Button, { BUTTON_COLOR } from 'weplay-components/Button'

import useCurrentTournament from 'weplay-events/pages/EventPage/hooks/useCurrentTournament'
import { TOURNAMENT_STATUSES } from 'weplay-events/pages/EventPage/constants'

import MVPStatusHint from '../MVPStatusHint/MVPStatusHint'
import MVPWinnersList from '../MVPWinnersList/MVPWinnersList'
import styles from '../MVPVoting.scss'

function MVPHeader({
  closestVoteDateTime,
  isAbleToVote,
  scrollToCoresBlock,
  scrollToSupportsBlock,
}) {
  const t = useTranslation()
  const tournament = useCurrentTournament()
  const isEnded = useMemo(() => tournament.status === TOURNAMENT_STATUSES.ENDED, [tournament.status])

  return (
    <div className={styles.wrap}>
      <div className={styles.content}>
        <p className={styles.title}>{t(`events.${tournament.slug}.MVPVotingBanner.title`)}</p>

        <p className={styles.description}>{t(`events.${tournament.slug}.MVPVotingBanner.description`)}</p>

        <Button
          color={BUTTON_COLOR.CTA}
          className={classNames(
            styles.button,
            styles.voteForCoreButton,
          )}
          onClick={scrollToCoresBlock}
        >
          {scrollToSupportsBlock
            ? t('events.MVPVotingBanner.MVPCandidates.title.core')
            : t('events.MVPVotingBanner.MVPCandidates.title.csGo')}
        </Button>

        {scrollToSupportsBlock && (
          <Button
            color={BUTTON_COLOR.CTA}
            className={styles.button}
            onClick={scrollToSupportsBlock}
          >
            {t('events.MVPVotingBanner.MVPCandidates.title.support')}
          </Button>
        )}

        <MVPStatusHint
          textClassName={styles.hint}
          isTournamentEnded={isEnded}
          closestVoteDateTime={closestVoteDateTime}
          isAbleToVote={isAbleToVote}
        />
      </div>

      <MVPWinnersList
        tournament={tournament}
      />
    </div>
  )
}

MVPHeader.propTypes = {
  closestVoteDateTime: PropTypes.instanceOf(Date),
  isAbleToVote: PropTypes.bool.isRequired,
  scrollToCoresBlock: PropTypes.func.isRequired,
  scrollToSupportsBlock: PropTypes.func,
}

MVPHeader.defaultProps = {
  closestVoteDateTime: null,
  scrollToSupportsBlock: null,
}

export default React.memo(MVPHeader)
