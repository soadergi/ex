import React, { useMemo } from 'react'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'
import Logo from 'weplay-components/Logo'
import Link from 'weplay-components/Link'
import { getFooterMenu } from 'weplay-components/Footer/mockedAPI'

import styles from './styles.scss'

const Footer = () => {
  const t = useTranslation()
  const { locale } = useLocale()
  const rulesMenu = useMemo(() => getFooterMenu(locale, 'rules').slice(1), [locale])
  const currentDate = (new Date()).getFullYear()

  return (
    <div className={styles.block}>
      <a
        target="_blank"
        href="/"
        className={styles.logo}
      >
        <Logo
          color="white"
        />
      </a>
      <div className={styles.copy}>
        <p className="u-mb-0">
          {`© 2011 - ${currentDate} ${t('mediaCore.crystalBall.footer.copyright')}`}
        </p>
      </div>
      <ul className={styles.list}>
        {rulesMenu.map(link => (
          <li key={link.id}>
            <Link
              to={link.localizations.url}
              className={styles.link}
            >
              {link.localizations.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Footer
