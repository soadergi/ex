import React, { useMemo } from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Link from 'weplay-components/Link'

import tournamentPropType from 'weplay-events/customPropTypes/tournamentPropType'
import PrizePool from 'weplay-events/pages/EventPage/components/PrizePool'
import DefaultEventDuration from 'weplay-events/components/HeroSection/Header/EventDuration'

import styles from './styles.scss'

const dateFormat = {
  start: 'dateFullMonth',
  end: 'dateFullMonth',
}

// TODO: @Tony replace with data from BO when ready
const GOOGLE_MAPS_LOCATION_LINK = 'https://goo.gl/maps/TRwcfEgDsr6LSn8H8'

const TournamentInfo = ({ tournament }) => {
  const t = useTranslation()

  // TODO: @Tony remove when data from BO when ready
  const hasGoogleMapsLocation = useMemo(
    () => tournament.slug === 'tug-of-war-mad-moon',
    [tournament.slug],
  )

  // const currentRoute = pathWithParamsByRoute(NAMES.EVENT_PAGE, match.params)

  return (
    <ul className={styles.mainInfo}>
      <li className={styles.column}>
        <div className={styles.titleInfo}>
          {t('events.eventHeroSection.title')}

          <PrizePool />
        </div>

        <p className={styles.text}>{tournament.prizePool}</p>

        <p className={styles.text}>{tournament.prizePoolDescription}</p>
      </li>

      <li className={styles.column}>
        <p className={styles.titleInfo}>
          {t('events.eventHeroSection.date')}
          {/*
          <Link
            to={`${currentRoute}`}
          >
            <span className={styles.scrollFrom}>
              {t('events.eventHeroSection.scrollFrom')}
            </span>
          </Link>
          */}
        </p>

        <DefaultEventDuration
          tournamentDates={{
            start: tournament.startDate,
            end: tournament.endDate,
          }}
          dateFormat={dateFormat}
        />
      </li>

      <li className={styles.column}>
        <p className={styles.titleInfo}>
          {t('events.eventHeroSection.participants')}

          {/*
          <Link
            to={`${currentRoute}/participants`}
          >
            <span
              className={styles.scrollFrom}
            >
              {t('events.eventHeroSection.scrollFrom')}
            </span>
          </Link>
          */}
        </p>

        <p className={styles.text}>
          {tournament.participantsAmount}
          {t('events.eventHeroSection.teams')}
        </p>
      </li>

      <li className={styles.column}>
        <p className={styles.titleInfo}>
          {t('events.eventHeroSection.location')}

          {hasGoogleMapsLocation && (
            <Link
              to={GOOGLE_MAPS_LOCATION_LINK}
              target="_blank"
              className={styles.scrollFrom}
              isExternal
            >
              {t('events.eventHeroSection.locationLink')}
            </Link>
          )}
        </p>

        <p className={styles.text}>
          {
            // TODO: @frontend Need to remove from lokalize when data from backend be ready
            t(`events.${tournament.slug}.eventHeroSection.country`)
          }
        </p>

        <p className={styles.text}>
          {
            // TODO: @frontend Need to remove from lokalize when data from backend be ready
            t(`events.${tournament.slug}.eventHeroSection.place`)
          }
        </p>
      </li>
    </ul>
  )
}

TournamentInfo.propTypes = {
  tournament: tournamentPropType.isRequired,
}

export default React.memo(TournamentInfo)
