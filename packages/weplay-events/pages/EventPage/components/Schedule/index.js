import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import GridWrapperWithControls from '../GridWrapperWithControls'

import ScheduleMatches from './ScheduleMatches/ScheduleMatches'

const Schedule = () => {
  const t = useTranslation()

  return (
    <GridWrapperWithControls
      title={t('events.schedule.title')}
      description={t('events.schedule.description')}
    >
      {grid => (
        <ScheduleMatches
          grid={grid}
        />
      )}
    </GridWrapperWithControls>
  )
}

export default Schedule
