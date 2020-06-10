import React from 'react'
import PropTypes from 'prop-types'
import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'
import { BUKOVEL_MINOR_LOGO_URL } from 'weplay-core/consts/bukovelMinorConfig'
import Icon from 'weplay-components/Icon'
import Image from 'weplay-components/Image'
import LanguageSwitcher from 'weplay-components/LanguageSwitcher'
import Link from 'weplay-components/Link'

import LatestNews from '../LatestNews'

import styles from './styles.scss'

const Header = ({ handleSubscription }) => {
  const t = useTranslation()
  const { locale } = useLocale()
  const linkUrl = pathWithParamsByRoute(NAMES.EVENT_PAGE, {
    tournamentDiscipline: 'dota-2',
    tournamentSlug: 'weplay-bukovel-minor-2020',
  })

  return (
    <div className={styles.block}>
      <div className={styles.linksBlock}>
        <LatestNews handleSubscription={handleSubscription} />
        <div className={styles.linkWrapper}>
          <Link
            to={linkUrl}
            className={styles.link}
            target="_blank"
          >
            <Icon
              iconName="bukovel-minor"
              className={styles.icon}
            />
            <span className={styles.title}>{t('mediaCore.crystalBall.header.link')}</span>
          </Link>
        </div>
      </div>
      <div className={styles.logoBlock}>
        <Image
          src={BUKOVEL_MINOR_LOGO_URL}
          alt="logo"
          className={styles.logo}
        />
      </div>
      <div className={styles.langWrapper}>
        <LanguageSwitcher
          currentLanguage={locale}
          className={styles.language}
          isResponsiveLanguageSwitcher
        />
      </div>
    </div>
  )
}

export default Header

Header.propTypes = {
  handleSubscription: PropTypes.func.isRequired,
}
