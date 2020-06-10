import classNames from 'classnames'
import React from 'react'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import { isDiscordConnectedSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { originSelector } from 'weplay-core/reduxs/common/selectors'
import { getAmplitudeAttributes } from 'weplay-core/helpers/getAmplitudeAttributes'
import { $propEq } from 'weplay-core/$utils/$propEq'

import Button, { BUTTON_COLOR, BUTTON_PRIORITY } from 'weplay-components/Button'
import { getSocialConfigs } from 'weplay-components/SocialNetworksLogin/consts'

import { useOauth2Handler } from 'hooks/useOauth2Handler'

import styles from './styles.scss'

const discordLink = {
  ru: 'https://discord.gg/jtMNb4X',
  en: 'https://discord.gg/jtMNb4X',
}

const AT_SUBMENU_JOIN_DISCORD = 'TOURNAMENTS.Submenu.Join Discord'

const PremiumSupportButton = () => {
  const t = useTranslation()
  const { locale } = useLocale()
  const origin = useSelector(originSelector)
  const isDiscordConnected = useSelector(isDiscordConnectedSelector)
  const config = getSocialConfigs(origin).find($propEq('source', 'discord'))
  const handleOpenAuthPopup = useOauth2Handler(config)

  return (
    <>
      {isDiscordConnected && (
      <Button
        priority={BUTTON_PRIORITY.PRIMARY}
        color={BUTTON_COLOR.DISCORD}
        icon="discord-contained"
        className="u-mb-2"
        href={discordLink[locale]}
      >
        {t('competitive.premium.success.page.linkDiscord')}
      </Button>
      )}
      {!isDiscordConnected && (
      <Button
        priority={BUTTON_PRIORITY.SECONDARY}
        color={BUTTON_COLOR.DISCORD}
        icon="discord-contained"
        className={classNames(
          styles.secondaryDiscord,
          'u-mb-2',
        )}
        onClick={handleOpenAuthPopup}
        {...getAmplitudeAttributes({
          'amplitude-action': AT_SUBMENU_JOIN_DISCORD,
        })}
      >
        {t('competitive.premium.success.page.buttonDiscord')}
      </Button>
      )}
    </>
  )
}

export default PremiumSupportButton
