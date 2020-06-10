import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import Section from 'weplay-components/_wrappers/Section'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import { getEventMediaResourcesSelector } from 'weplay-events/reduxs/tournamentResources/selectors'
import { TweetsListMarkup } from 'weplay-events/components/TweetsList'
import { useCurrentTournamentId } from 'weplay-events/pages/EventPage/CurrentTournamentIdProvider'

import styles from './styles.scss'

const Tweets = () => {
  const tournamentId = useCurrentTournamentId()
  const { items } = useSelector(getEventMediaResourcesSelector)(tournamentId)
  const tournamentHotTweetIDs = items?.twitter?.tweetIdsList
  const [isOpened, setIsOpened] = useState(true)

  if (!tournamentId || !tournamentHotTweetIDs?.length) return null

  const allTweetsUrl = items?.twitter?.allTweetsHashtag
  const handleClick = () => setIsOpened(!isOpened)

  return (
    <Section
      className={classNames(
        styles.hasBorderTop,
        'u-py-8',
      )}
    >
      <ContentContainer>
        <TweetsListMarkup
          tournamentHotTweetIDs={tournamentHotTweetIDs}
          allTweetsUrl={allTweetsUrl}
          isOpened={isOpened}
          handleClick={handleClick}
        />
      </ContentContainer>
    </Section>
  )
}

export default React.memo(Tweets)
