import React, { useState, useEffect, useMemo } from 'react'
import classNames from 'classnames'

import { useParams } from 'weplay-singleton/RouterProvider/useParams'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import { axios } from 'weplay-core/services/axios'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import BackgroundFullWidth from 'weplay-components/BackgroundFullWidth'
import Link from 'weplay-components/Link'
import Icon from 'weplay-components/Icon'
import Button, { BUTTON_COLOR } from 'weplay-components/Button'
import TwitchDonateModal from 'weplay-components/TwitchDonateModal/TwitchDonateModal'

import {
  defaultState, CHARITY_PLAY_SLUG, DONATION_STATS_URL,
} from './helpers'
import styles from './CharityPlayBlock.scss'
import backgroundUrl from './img/background.jpg'
import TargetLine from './components/TargetLine/TargetLine'
import BenefitsFromDonation from './components/BenefitsFromDonation/BenefitsFromDonation'

const howToLinks = {
  en: '/news/wesave-charity-play-faq-20897',
  ru: '/news/wesave-charity-play-chasto-zadavaemye-voprosy-20897',
}

const CharityPlayBlock = () => {
  const { tournamentSlug } = useParams()
  const [donations, setDonations] = useState(defaultState)
  const [isTwitchDonateModalOpen, setIsTwitchDonateModalOpen] = useState(false)
  const t = useTranslation()
  const { locale } = useLocale()

  const howToLink = useMemo(
    () => howToLinks[locale],
    [locale],
  )

  const preventRender = tournamentSlug !== CHARITY_PLAY_SLUG

  useEffect(() => {
    if (preventRender) {
      return
    }

    axios.get(DONATION_STATS_URL)
      .then(response => ({
        totalAmount: response.data?.totalAmount ?? 0,
        milestones: response.data?.milestones ?? [],
      }))
      .then(setDonations)
      .catch(error => console.warn('error', error))
  }, [preventRender])

  if (preventRender) {
    return null
  }

  return (
    <div className={styles.block}>
      <ContentContainer>
        <BackgroundFullWidth src={backgroundUrl} />

        <div className={styles.content}>
          <p className={styles.title}>{t('events.eventPage.blocks.charityPlayBlock.title')}</p>

          <p className={styles.description}>{t('events.eventPage.blocks.charityPlayBlock.description')}</p>

          <Link
            to={howToLink}
            className={styles.link}
          >
            {t('events.eventPage.blocks.charityPlayBlock.howItWorkLink')}
          </Link>

          <Link
            to="https://weplay.tv/legal/we-save-charity-play-tournament-regulations"
            className={styles.link}
          >
            {t('events.eventPage.blocks.charityPlayBlock.infoLink')}
          </Link>
        </div>

        <TargetLine
          donations={donations}
        />

        <div className={styles.buttons}>
          <Button
            className={classNames(
              styles.button,
              styles.twitchButton,
            )}
            color={BUTTON_COLOR.TWITCH}
            onClick={() => setIsTwitchDonateModalOpen(true)}
          >
            <Icon
              size="small"
              iconName="twitch"
              className={styles.icon}
            />
            {t('events.eventPage.blocks.charityPlayBlock.twitchLink')}
          </Button>

          <Link
            to="/donate-we-save"
            className={classNames(
              styles.button,
              styles.internalButton,
            )}
          >
            {t('events.eventPage.blocks.charityPlayBlock.eventPageLink')}
          </Link>
        </div>
      </ContentContainer>

      <div className={styles.wideLine}>
        <span>{t('events.eventPage.blocks.charityPlayBlock.wideLineText')}</span>

        <a
          href={`mailto:${t('events.eventPage.blocks.charityPlayBlock.wideLineEmail')}`}
          className={styles.email}
        >
          {t('events.eventPage.blocks.charityPlayBlock.wideLineEmail')}
        </a>
      </div>

      {
        donations.milestones.length > 0 && (
          <ContentContainer>
            <BenefitsFromDonation
              milestones={donations.milestones}
              totalAmount={donations.totalAmount}
            />
          </ContentContainer>
        )
      }

      {isTwitchDonateModalOpen && (
        <TwitchDonateModal
          handleClose={() => setIsTwitchDonateModalOpen(false)}
        />
      )}
    </div>
  )
}

export default React.memo(CharityPlayBlock)
