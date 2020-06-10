import React, { useMemo } from 'react'

import { useParams } from 'weplay-singleton/RouterProvider/useParams'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import Section from 'weplay-components/_wrappers/Section'

// import NextArrow from 'weplay-events/components/NextArrow'
// import PrevArrow from 'weplay-events/components/PrevArrow'
import { TOURNAMENT_STATUSES } from 'weplay-events/pages/EventPage/constants'

import { eventsCalendar } from './mocks'
import CalendarEvent from './CalendarEvent'
import styles from './styles.scss'
import container from './container'

const EVENT_WITH_TICKETS_ID = '5'

const Calendar = () => {
  const t = useTranslation()
  const { tournamentSlug } = useParams()
  const tournamentEvents = useMemo(
    () => eventsCalendar[tournamentSlug],
    [tournamentSlug, eventsCalendar],
  )

  if (!tournamentEvents) return null

  return (
    <Section className="u-pt-8 u-pb-0">
      <div
        className={styles.block}
        data-event-position="Calendar"
      >
        <ContentContainer>
          <p className={styles.title}>
            {t('events.calendar.title')}

            {/* }
            {false && (
              <>
                <PrevArrow />
                <NextArrow />
              </>
            )}
            { */}
          </p>

          <div className={styles.wrap}>
            {tournamentEvents.map((event, index) => (
              <CalendarEvent
                key={event.id}
                event={event}
                isLastColumn={index === tournamentEvents.length - 1}
                isEventWithTicket={event.id === EVENT_WITH_TICKETS_ID && event.status !== TOURNAMENT_STATUSES.ENDED}
              />
            ))}
          </div>
        </ContentContainer>
      </div>
    </Section>
  )
}

export default container(Calendar)
