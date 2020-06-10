import React from 'react'

import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'

import Image from 'weplay-components/Image'
import Link from 'weplay-components/Link'

import { MAD_MOON_LOGO_URL, LOONY_DRAGON_LOGO_URL } from '../config'

import styles from './Header.scss'

const Header = () => {
  const eventLink = pathWithParamsByRoute(NAMES.EVENT_PAGE, {
    tournamentDiscipline: 'dota-2',
    tournamentSlug: 'tug-of-war-mad-moon',
  })

  return (
    <div className={styles.block}>
      <Link
        className={styles.logoWrap}
        to={eventLink}
        target="_blank"
      >
        <Image
          src={MAD_MOON_LOGO_URL}
          alt="logo"
          className={styles.eventLogo}
        />
      </Link>
      <Image
        src={LOONY_DRAGON_LOGO_URL}
        alt="logo"
        className={styles.logo}
      />
    </div>
  )
}

export default Header
