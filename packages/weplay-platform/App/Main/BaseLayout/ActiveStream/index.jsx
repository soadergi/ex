import React from 'react'
import MediaPlayer from 'weplay-components/MediaPlayer'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { setCSSModifiers } from 'weplay-core/helpers/setCSSModifiers'
import withRouteInfo from 'weplay-core/routes/withRouteInfo'
import routeInfoPropType from 'weplay-core/customPropTypes/routeInfoPropType'
import { getActiveTournamentLiveStreamSelector } from 'weplay-core/reduxs/activeTournament/selectors'

import { useActiveStream } from './container'
import styles from './styles.scss'

const articlePlayer = ['articlePlayer']

const ActiveStream = ({
  // required props
  routeInfo,
}) => {
  const {
    isAllowedPage,
    modifiers,
  } = useActiveStream({ routeInfo })
  const { liveStreamUrl } = useSelector(getActiveTournamentLiveStreamSelector)

  if (!liveStreamUrl || !isAllowedPage) return null

  return (
    <div
      className={classNames(
        styles.block,
        setCSSModifiers(modifiers, styles),
      )}
    >
      <MediaPlayer
        url={liveStreamUrl}
        modifiers={articlePlayer}
      />
    </div>
  )
}

ActiveStream.propTypes = {
  // required props
  routeInfo: routeInfoPropType.isRequired,
}

export default withRouteInfo(ActiveStream)
