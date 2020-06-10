import React from 'react'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import Section from 'weplay-components/_wrappers/Section'

import useScrollTo from 'weplay-events/hooks/useScrollIntoView'

import MVPCandidates from './MVPCandidates/MVPCandidates'
import styles from './MVPVoting.scss'
import useMVPVoting from './useMVPVoting'
import MVPHeader from './MVPHeader/MVPHeader'

function VotingBlock() {
  const t = useTranslation()

  const {
    votingCore,
    votingSupport,
    nextVoteDateTimeCore,
    nextVoteDateTimeSupport,
    isAbleToVoteCore,
    isAbleToVoteSupport,
    closestVoteDateTime,
  } = useMVPVoting()

  const [coresBlock, scrollToCoresBlock] = useScrollTo()
  const [supportsBlock, scrollToSupportsBlock] = useScrollTo()

  return (
    <Section className="u-py-0">
      <div
        className={classNames(
          styles.subscribeTournamentBanner,
          styles.block,
        )}
      >
        <ContentContainer>
          <MVPHeader
            closestVoteDateTime={closestVoteDateTime}
            isAbleToVote={isAbleToVoteCore || isAbleToVoteSupport}
            scrollToCoresBlock={scrollToCoresBlock}
            scrollToSupportsBlock={votingSupport ? scrollToSupportsBlock : null}
          />

          <div ref={coresBlock}>
            <MVPCandidates
              voting={votingCore}
              title={t('events.MVPVotingBanner.MVPCandidates.title.core')}
              isAbleToVote={isAbleToVoteCore}
              nextVoteDateTime={nextVoteDateTimeCore}
            />
          </div>

          {votingSupport && (
            <div ref={supportsBlock}>
              <MVPCandidates
                voting={votingSupport}
                title={t('events.MVPVotingBanner.MVPCandidates.title.support')}
                isAbleToVote={isAbleToVoteSupport}
                nextVoteDateTime={nextVoteDateTimeSupport}
              />
            </div>
          )}
        </ContentContainer>
      </div>
    </Section>
  )
}

export default React.memo(VotingBlock)
