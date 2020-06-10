import React, { useState } from 'react'
import PropTypes from 'prop-types'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'

import EventMatchList from '../EventMatchList/EventMatchList'
import LeaderBoard from '../LeaderBoard/LeaderBoard'
import GuessWinnersHeader from '../GuessWinnersHeader/GuessWinnersHeader'

const tabs = ['matches', 'leaderBoard']

function Predictions({ setIsModalOpened }) {
  const [activeTab, setActiveTab] = useState(tabs[0])

  return (
    <div className="u-pt-8 u-pb-8">
      <ContentContainer>
        <GuessWinnersHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <EventMatchList
          isActive={activeTab === tabs[0]}
          setIsModalOpened={setIsModalOpened}
        />

        <LeaderBoard isActive={activeTab === tabs[1]} />
      </ContentContainer>
    </div>
  )
}

Predictions.propTypes = {
  setIsModalOpened: PropTypes.func.isRequired,
}

export default React.memo(Predictions)
