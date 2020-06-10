import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import { currentUserSteamIdSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'
import { axios } from 'weplay-core/services/axios'
import { camelizeKeys } from 'weplay-core/reduxs/helpers'

import ModalBase from 'weplay-components/ModalBase'
import ModalHeader from 'weplay-components/ModalBase/ModalHeader'
import Button, { BUTTON_COLOR } from 'weplay-components/Button'
import Icon from 'weplay-components/Icon'

import SuccessTable from './SuccessTable/SuccessTable'
import { useSteamEventListener } from './useSteamEventListener'
import styles from './ConnectSteam.scss'

const supportLink = {
  ru: 'https://weplayhelp.zendesk.com/hc/ru',
  en: 'https://weplayhelp.zendesk.com/hc/en-us',
}

const getSupportLink = locale => supportLink[locale]

const ConnectSteam = ({
  isShown,
  closeHandler,
  finalActionName,
  finalAction,
}) => {
  const t = useTranslation()
  const { locale } = useLocale()
  const globalScope = useSelector(globalScopeSelector)
  const [steamError, setSteamError] = useState('')
  const [steamNickname, setSteamNickname] = useState('')
  const [isConnectSteamBtnDisabled, setIsConnectSteamBtnDisabled] = useState(false)
  useSteamEventListener({
    setSteamNickname,
    setSteamError,
    setIsConnectSteamBtnDisabled,
  })

  const currentUserSteamId = useSelector(currentUserSteamIdSelector)
  const userSteam = steamNickname || currentUserSteamId
  const isSteamConnected = Boolean(userSteam)

  const handleFinalBtn = useCallback(() => {
    finalAction()
    closeHandler()
  }, [finalAction, closeHandler])

  const handleAddSteam = useCallback(() => {
    setIsConnectSteamBtnDisabled(true)
    axios.get('/user-management-service/v1/social/steam/login-url')
      .then(camelizeKeys)
      .then(response => globalScope.open(response?.data?.redirectUrl, 'AuthPopup', 'resizable,scrollbars,status'))
      .catch(err => console.info('handleAddSteam return error: ', err))
      .finally(() => {
        setIsConnectSteamBtnDisabled(false)
      })
  }, [globalScope])

  return (
    <ModalBase
      handleClose={closeHandler}
      isShown={isShown}
    >
      <ModalHeader
        titleText={isSteamConnected
          ? t('competitive.tournament.modals.connectGame.successTitle')
          : t('competitive.tournament.modals.connectGame.title')}
        className={classNames(
          styles.textBlack,
          styles.title,
          'u-pt-0',
          'u-mb-0',
        )}
      />
      {steamError && (
        <span className={styles.steamError}>
          <Icon
            iconName="error"
            className="u-mr-1"
          />
            {t('competitive.tournament.modals.connectGameAndSteam.steamAlreadyExists')}
        </span>
      )}
      {isSteamConnected && (
        <>
          <SuccessTable
            userSteam={userSteam}
          />
          <p className={classNames(
            styles.textSecondary,
            styles.textSm,
            'u-mt-2',
            'u-mb-3',
          )}
          >
            {t('competitive.tournament.modals.connectGameAndSteam.onlyOneSteamAlert',
              {
                supportLink: (
                  <a
                    href={getSupportLink(locale)}
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    {t('competitive.tournament.modals.connectGameAndSteam.supportTeam')}
                  </a>
                ),
              })}
          </p>
          <Button
            className={styles.nextButton}
            onClick={handleFinalBtn}
          >
            {t(`competitive.tournament.modals.connectGameAndSteam.${finalActionName}`)}
          </Button>
        </>
      )}
      {!isSteamConnected && (
        <>
          <Button
            color={BUTTON_COLOR.CTA}
            className={styles.button}
            icon="steam"
            disabled={isConnectSteamBtnDisabled}
            onClick={handleAddSteam}
          >
            {t('competitive.tournament.modals.connectGameAndSteam.connectSteam')}
          </Button>
          <p className={classNames(
            styles.textSecondary,
            styles.textSm,
            'u-mt-3',
            'u-mb-0',
          )}
          >
            {t('competitive.tournament.modals.connectGameAndSteam.haveTrouble',
              {
                supportLink: (
                  <a
                    href={getSupportLink(locale)}
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    {t('competitive.tournament.modals.connectGameAndSteam.supportTeam')}
                  </a>
                ),
              })}
          </p>
        </>
      )}
    </ModalBase>
  )
}

ConnectSteam.propTypes = {
  // required props
  isShown: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  finalActionName: PropTypes.string.isRequired,
  finalAction: PropTypes.func.isRequired,
}

export default ConnectSteam
