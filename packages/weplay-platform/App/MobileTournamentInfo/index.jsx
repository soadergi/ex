import * as PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
import Link from 'weplay-components/Link'

import styles from './styles.scss'

const MobileTournamentInfo = ({
  tournament,
  tournamentLinkUrl,
  liveStreamUrl,
}) => {
  const t = useTranslation()
  const isMobileWidth = useSelector(isMobileWidthSelector)

  if (!tournament?.id || !isMobileWidth) return null

  return (
    <Link
      to={tournamentLinkUrl}
      className={classNames(
        styles.block,
        { [styles.isLive]: Boolean(liveStreamUrl) },
      )}
    >
      <p className={styles.title}>
        <span>{tournament.shortName}</span>

        {t('events.ProTournamentBlockPortal.location')}
      </p>
    </Link>
  )
}

MobileTournamentInfo.propTypes = {
  tournament: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    logoUrl: PropTypes.string,
    logoAlt: PropTypes.string,
    shortName: PropTypes.string,
  }),
  tournamentLinkUrl: PropTypes.string.isRequired,
  liveStreamUrl: PropTypes.string.isRequired,
}
MobileTournamentInfo.defaultProps = {
  tournament: undefined,
}
export default MobileTournamentInfo
