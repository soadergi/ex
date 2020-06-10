import React, { useMemo } from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

import { useParams } from 'weplay-singleton/RouterProvider/useParams'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import SlickSlider from 'weplay-components/Slider/loadable'
import Image from 'weplay-components/Image'
import Link from 'weplay-components/Link'

import {
  MAD_MOON_TAB_ID,
  carouselConfig,
  TOURNAMENT_SLUGS_WITH_SERIES_NAVIGATION,
} from './constants'
import { TUG_OF_WAR_TOURNAMENTS } from './mock'
import styles from './styles.scss'

function SeriesNavigation() {
  const t = useTranslation()
  const { tournamentSlug } = useParams()
  const isMobileWidth = useSelector(isMobileWidthSelector)

  const isTournamentWithSeriesNavigation = useMemo(
    () => TOURNAMENT_SLUGS_WITH_SERIES_NAVIGATION.includes(tournamentSlug),
    [tournamentSlug],
  )

  if (!isTournamentWithSeriesNavigation) return null

  return (
    <div className={styles.block}>
      <ContentContainer>
        <SlickSlider
          {...carouselConfig}
          className={styles.slider}
        >
          {TUG_OF_WAR_TOURNAMENTS.map(tournament => (
            <div key={tournament.id}>
              <Link
                to={tournament.url}
                className={classNames(
                  styles.tournamentLink,
                  { [styles.isActive]: tournament.id === MAD_MOON_TAB_ID },
                )}
              >
                {!isMobileWidth && (
                  <Image
                    className={classNames(
                      'o-img-responsive',
                      styles.image,
                    )}
                    src={tournament.logo}
                    alt=""
                  />
                )}

                <div>
                  <p className={styles.title}>{t(tournament.title)}</p>

                  <p className={styles.dateTime}>
                    {t(tournament.dateTime)}
                    <span className={styles.prize}>{t(tournament.prize)}</span>
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </SlickSlider>
      </ContentContainer>
    </div>
  )
}

export default SeriesNavigation
