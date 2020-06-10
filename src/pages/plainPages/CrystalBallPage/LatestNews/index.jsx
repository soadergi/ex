import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { capitalizeFirstLetter } from 'weplay-core/helpers/capitalizeFirstLetter'
import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'
import { bukovelMinorBotLinksByLanguage } from 'weplay-core/consts/bukovelMinorConfig'
import Link from 'weplay-components/Link'
import Icon from 'weplay-components/Icon'

import styles from './styles.scss'

const LatestNews = ({ handleSubscription }) => {
  const t = useTranslation()
  const { locale } = useLocale()
  const botLinks = useMemo(() => bukovelMinorBotLinksByLanguage[locale], [locale])

  return (
    <div className={styles.block}>
      <div className={styles.latestNews}>
        {botLinks.map(botLink => (
          <Link
            className={styles.link}
            to={botLink.url}
            onClick={handleSubscription}
            {...getAnalyticsAttributes({
              category: 'Social',
              action: `Join ${capitalizeFirstLetter(botLink.name)} channel`,
              position: 'header',
            })}
          >
            <Icon
              iconName={botLink.iconName}
            />
            <span className={styles.title}>{t(`mediaCore.crystalBall.latestNews.${botLink.name}`)}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

LatestNews.propTypes = {
  handleSubscription: PropTypes.func.isRequired,
}

export default LatestNews
