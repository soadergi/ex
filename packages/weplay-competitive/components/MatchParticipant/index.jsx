import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import imgPropType from 'weplay-core/customPropTypes/imgPropType'
import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'
import Link from 'weplay-components/Link'
import Icon from 'weplay-components/Icon'
import UserAvatar from 'weplay-components/UserAvatar'
import Status from 'weplay-competitive/components/Status'
import { AT__TOURNAMENTS_LINK_TO_STEAM } from 'weplay-competitive/analytics/amplitude'

import styles from './styles.scss'

const MatchParticipant = ({
  avatar,
  name,
  subtitle,
  link,
  isPremiumAccount,
  // options from container
  // optional props
  status,
  steamId,
}) => {
  const t = useTranslation()
  return (
    <div className={styles.block}>
      <Link
        to={link}
        className={styles.block}
        target="_blank"
      >
        <UserAvatar
          avatar={avatar}
          isPremiumAccount={isPremiumAccount}
          size="32"
        />
      </Link>
      <div className={styles.info}>
        <Link
          to={link}
          className={styles.block}
          target="_blank"
        >
          <span className={styles.name}>{name}</span>
        </Link>
        <div className={styles.status}>
          <div className={styles.playerInfo}>
            {subtitle && (
            <span className={styles.subtitle}>{subtitle}</span>
            )}
            {steamId && (
            <Link
              isExternal
              to={`https://steamcommunity.com/profiles/${steamId}`}
              className={styles.steam}
              {...getAnalyticsAttributes({
                'amplitude-action': AT__TOURNAMENTS_LINK_TO_STEAM,
                'amplitude-source': LOOKUP,
              })}
            >
              <Icon
                iconName="steam"
              />
            </Link>
            )}
          </div>
          {status && (
            <Status
              isWarning={status === 'notReady'}
              isSuccess={status === 'ready'}
            >
              {t(`competitive.match.warnings.${status}`)}
            </Status>
          )}
        </div>
      </div>
    </div>
  )
}

MatchParticipant.propTypes = {
  avatar: imgPropType,
  name: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  link: PropTypes.string,
  status: PropTypes.string,
  isPremiumAccount: PropTypes.bool,
  steamId: PropTypes.string,
}

MatchParticipant.defaultProps = {
  avatar: '',
  subtitle: '',
  link: '',
  status: '',
  isPremiumAccount: false,
  steamId: '',
}

export default MatchParticipant
