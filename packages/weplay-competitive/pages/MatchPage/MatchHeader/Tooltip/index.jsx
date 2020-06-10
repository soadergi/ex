import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'
import Icon from 'weplay-components/Icon'
import { AT__LOBBY_ANTICHEAT } from 'weplay-competitive/analytics/amplitude'

import container from './container'
import styles from './styles.scss'

const Tooltip = ({
  // required props

  // container props
  linkUrlGuard,
  // optional props
  className,
}) => {
  const t = useTranslation()
  return (
    <div
      className={classNames(
        styles.block,
        className,
      )}
    >
      <a
        href={linkUrlGuard}
        className={styles.link}
        rel="noreferrer noopener"
        target="_blank"
        {...getAnalyticsAttributes({
          'amplitude-action': AT__LOBBY_ANTICHEAT,
        })}
      >
        <Icon
          iconName="csgo-prime"
          className={styles.icon}
        />
        <span className={styles.text}>
          {t('competitive.match.tip.primeAccount')}
        </span>
      </a>
    </div>
  )
}

Tooltip.propTypes = {
  // required props

  // container props
  linkUrlGuard: PropTypes.string.isRequired,
  handleLinkClick: PropTypes.func.isRequired,
  // optional props
  className: PropTypes.string,
}

Tooltip.defaultProps = {
  // optional props
  className: '',
}

export default container(Tooltip)
