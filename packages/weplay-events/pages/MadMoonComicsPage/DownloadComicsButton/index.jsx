import React, { useMemo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import useAction from 'weplay-core/helpers/useAction'
import { isLoggedInSelector, userEmailSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { openLoginModal } from 'weplay-core/reduxs/_legacy/modals/actions'
import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'

import Icon from 'weplay-components/Icon'
import Button, { BUTTON_COLOR } from 'weplay-components/Button'

import downloadFile from 'weplay-events/helpers/downloadFile'

import styles from './styles.scss'

const COMICS_URLS = {
  ru: 'https://static-prod.weplay.tv/2020-02-18/6f1eb59627cf2be1e7dbf2ec3472ce7d.pdf',
  en: 'https://static-prod.weplay.tv/2020-02-18/0aede4af370533fa525be037a05083d8.pdf',
}

const DownloadComicsButton = () => {
  const t = useTranslation()
  const { locale } = useLocale()
  const isLoggedIn = useSelector(isLoggedInSelector)
  const userEmail = useSelector(userEmailSelector)
  const { openLogin } = useAction({ openLogin: openLoginModal })

  const buttonText = useMemo(
    () => (isLoggedIn
      ? t('events.MadMoonComicsPage.successButton')
      : t('events.MadMoonComicsPage.signUp')),
    [isLoggedIn, t],
  )

  const handleClick = useCallback(
    () => {
      if (!isLoggedIn) {
        openLogin()
        return
      }

      downloadFile(COMICS_URLS[locale], 'comics.pdf')
    },
    [isLoggedIn, locale],
  )

  return (
    <div
      {...getAnalyticsAttributes({
        category: 'Download comics',
        action: 'click',
        label: userEmail,
      })}
    >
      <Button
        color={isLoggedIn ? BUTTON_COLOR.SUCCESS : BUTTON_COLOR.CTA}
        type="button"
        className={classNames(
          styles.button,
          { [styles.successButton]: isLoggedIn },
        )}
        onClick={handleClick}
      >
        {isLoggedIn && (
          <Icon
            size="small"
            iconName="arrow-link"
            className={classNames(
              styles.icon,
              'u-mr-1',
            )}
          />
        )}
        {buttonText}
      </Button>
    </div>
  )
}

export default DownloadComicsButton
