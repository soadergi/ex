import React from 'react'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Link from 'weplay-components/Link'
import Icon from 'weplay-components/Icon'

import styles from './MemberNavigationBar.scss'

const MemberNavigationBar = ({
  linkTo,
  show,
}) => {
  const t = useTranslation()
  return (
    <nav className={styles.navigation}>
      <Link
        className={classNames(
          styles.slideBtn,
          styles.leftBtn,
        )}
        to={linkTo.PrevMember}
        onClick={show.prevMember}
        replace
      >
        <Icon
          iconName="arrow-link"
          className={styles.icon}
        />
        <span className={styles.text}>{t('teamPage.member.btnPrev')}</span>
      </Link>

      <Link
        className={styles.navigationItem}
        to={linkTo.teamPage}
      >
        <Icon
          iconName="close"
        />
      </Link>

      <Link
        to={linkTo.NextMember}
        onClick={show.nextMember}
        className={styles.slideBtn}
        replace
      >
        <span className={styles.text}>{t('teamPage.member.btnNext')}</span>
        <Icon
          iconName="arrow-link"
          className={styles.icon}
        />

      </Link>
    </nav>
  )
}

export default MemberNavigationBar
