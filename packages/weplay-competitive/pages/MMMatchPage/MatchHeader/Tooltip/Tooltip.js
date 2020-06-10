import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'

import Icon from 'weplay-components/Icon'

import { AT__LOBBY_ANTICHEAT } from 'weplay-competitive/analytics/amplitude'

import styles from './Tooltip.scss'

const Tooltip = ({
  className,
}) => {
  const t = useTranslation()
  const { locale } = useLocale()
  const linkUrlGuard = useMemo(() => (locale === 'ru'
    ? 'https://weplayhelp.zendesk.com/hc/ru/articles/360003166098-%D0%9F%D1%80%D0%B0%D0%B9%D0%BC-%D0%B0%D0%BA%D0%BA%D0%B0%D1%83%D0%BD%D1%82-CS-GO' // eslint-disable-line max-len
    : 'https://weplayhelp.zendesk.com/hc/en-us/articles/360003166098-Prime-account-CS-GO'), [locale])
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
  className: PropTypes.string,
}

Tooltip.defaultProps = {
  className: '',
}

export default Tooltip
