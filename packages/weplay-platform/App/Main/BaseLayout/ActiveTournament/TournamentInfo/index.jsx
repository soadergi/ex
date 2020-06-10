import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import withRouteInfo from 'weplay-core/routes/withRouteInfo'
import withScrollInfo from 'weplay-core/HOCs/withScrollInfo'
import routeInfoPropType from 'weplay-core/customPropTypes/routeInfoPropType'
import NotificationLabel from 'weplay-components/NotificationLabel'
import Link from 'weplay-components/Link'

import { useStrokeVisible } from './container'
import styles from './styles.scss'

const size = 'xl'

const TournamentInfo = ({
  tournament,
  tournamentLinkUrl,
  isStreamLive,
  routeInfo,
  isScrolledTop,
}) => {
  const { isStrokeVisible } = useStrokeVisible({
    routeInfo,
    isScrolledTop,
  })

  const t = useTranslation()

  return (
    <div className={styles.block}>
      <div className={styles.indicator}>
        {isStreamLive ? (
          <div className={styles.live}>
            <NotificationLabel
              isActive
              size={size}
              className={styles.notification}
            />

            {isStrokeVisible && <div className={styles.stroke} />}
          </div>
        ) : (
          <Link to={tournamentLinkUrl}>
            <img
              src={tournament.logoUrl}
              alt={tournament.logoAlt}
              className="o-img-responsive"
            />
          </Link>
        )}
      </div>

      <div className={styles.content}>
        <span className={styles.title}>{tournament.shortName}</span>

        {isStreamLive && <span className={styles.date}>{t('events.ProTournamentBlockPortal.location')}</span>}

        <Link
          className={styles.link}
          to={tournamentLinkUrl}
        >
          {t('events.ProTournamentBlockPortal.linkText')}
        </Link>
      </div>
    </div>
  )
}

TournamentInfo.propTypes = {
  tournament: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    logoUrl: PropTypes.string,
    logoAlt: PropTypes.string,
    shortName: PropTypes.string,
  }).isRequired,
  tournamentLinkUrl: PropTypes.string.isRequired,
  routeInfo: routeInfoPropType.isRequired,
  isScrolledTop: PropTypes.bool.isRequired,
  isStreamLive: PropTypes.bool.isRequired,
}

export default withScrollInfo(['isScrolledTop'])(withRouteInfo(TournamentInfo))
