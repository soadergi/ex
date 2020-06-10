import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import TournamentGrid from 'weplay-events/pages/EventPage/components/Grid/TournamentGrid'

import GridWrapperWithControls from '../GridWrapperWithControls'

const Standings = () => {
  const t = useTranslation()

  return (
    <GridWrapperWithControls title={t('events.standings.title')}>
      {grid => <TournamentGrid grid={grid} />}
    </GridWrapperWithControls>
  )
}

export default Standings
