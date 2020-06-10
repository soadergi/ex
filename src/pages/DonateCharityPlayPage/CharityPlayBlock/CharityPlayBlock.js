import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { NavHashLink } from 'react-router-hash-link'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import { axios } from 'weplay-core/services/axios'

import Button, { BUTTON_COLOR } from 'weplay-components/Button'
import Image from 'weplay-components/Image'
import Icon from 'weplay-components/Icon'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import BackgroundFullWidth from 'weplay-components/BackgroundFullWidth'
import ShareBlock from 'weplay-components/ShareBlock/ShareBlock'
import Link from 'weplay-components/Link'

import downloadFile from 'weplay-events/helpers/downloadFile'
// eslint-disable-next-line max-len
import BenefitsFromDonation from 'weplay-events/pages/EventPage/blocks/CharityPlayBlock/components/BenefitsFromDonation/BenefitsFromDonation'
import TargetLine from 'weplay-events/pages/EventPage/blocks/CharityPlayBlock/components/TargetLine/TargetLine'
import {
  defaultState, DONATION_STATS_URL,
} from 'weplay-events/pages/EventPage/blocks/CharityPlayBlock/helpers'

import SponsorDonations from '../SponsorDonations/SponsorDonations'

import styles from './CharityPlayBlock.scss'
import backgroundUrl from './img/background.jpg'
import hand from './img/hand.png'
import logo from './img/logo.png'
import wesave from './img/wesave.png'

const URL_GIFT = {
  en: 'https://static-prod.weplay.tv/2020-03-19/57b9141cf28de1a8354d80ee6998221e.082549-3BADD6-D1DAE3.jpeg',
  ru: 'https://static-prod.weplay.tv/2020-03-19/b30e88112f2a2ef8976a6d5fa35d6ae4.09254A-3BADD7-C2CBD6.jpeg',
}

const CharityPlayBlock = ({ shareButtonsImage, isSuccessPage }) => {
  const [donations, setDonations] = useState(defaultState)
  const t = useTranslation()
  const scrollHandler = (el) => {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    axios.get(DONATION_STATS_URL)
      .then(response => ({
        totalAmount: response.data?.totalAmount ?? 0,
        milestones: response.data?.milestones ?? [],
        sponsorDonations: response.data?.sponsorDonations ?? [],
      }))
      .then(setDonations)
      .catch(error => console.warn('error', error))
  }, [])

  const { locale } = useLocale()

  return (
    <>
      <div className={styles.block}>
        <ContentContainer>
          <BackgroundFullWidth src={backgroundUrl} />

          <div className={styles.content}>
            <div className={styles.main}>
              <p className={styles.title}>
                {isSuccessPage ? t('charity.paymentBlock.successTitle') : t('charity.paymentBlock.title')}
              </p>

              <p className={styles.description}>
                {isSuccessPage ? t('charity.paymentBlock.successDescription') : t('charity.paymentBlock.description')}
              </p>

              {isSuccessPage && (
                <Button
                  className={styles.download}
                  color={BUTTON_COLOR.SUCCESS}
                  onClick={() => downloadFile(URL_GIFT[locale])}
                >
                  {t('charity.paymentBlock.download')}
                </Button>
              )}

              <div className={styles.shareBlockContent}>
                <span className={styles.shareBlockText}>{t('charity.paymentBlock.shareDescription')}</span>

                <ShareBlock
                  className={styles.share}
                  color="blue"
                  sharedText={t('events.wesaveCharityPlayPage.sharedText')}
                  image={shareButtonsImage}
                />
              </div>
            </div>

            <div className={styles.poster}>
              {isSuccessPage
                ? (
                  <Image
                    className={styles.logo}
                    src={hand}
                    alt="logo"
                  />
                )
                : (
                  <div className={styles.animationWrapper}>
                    <Image
                      className={styles.anim}
                      src={logo}
                      alt="logo"
                    />
                    <Image
                      className={styles.wesave}
                      src={wesave}
                      alt="logo"
                    />
                  </div>
                )}
            </div>
          </div>
          <div className={styles.legal}>
            <Link to="https://weplay.tv/legal/we-save-charity-play-tournament-regulations">
              {t('charity.donateStripe.button.legal')}
            </Link>
          </div>
          <div className={styles.anchor}>
            <NavHashLink
              to="#charity"
              scroll={scrollHandler}
              className={styles.button}
            >
              <span className={styles.textAnchor}>
                {t('charity.donateStripe.button.anchor')}
              </span>
              <Icon iconName="arrow-down-second" />
            </NavHashLink>
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
      </div>

      <div className={styles.footer}>
        <ContentContainer>
          <TargetLine
            donations={donations}
          />
          {
            donations.milestones.length > 0 && (
              <BenefitsFromDonation
                milestones={donations.milestones}
                totalAmount={donations.totalAmount}
              />
            )
          }
        </ContentContainer>
      </div>

      {
        donations.sponsorDonations.length > 0 && (
          <ContentContainer>
            <SponsorDonations
              sponsorDonations={donations.sponsorDonations}
            />
          </ContentContainer>
        )
      }
    </>
  )
}

CharityPlayBlock.propTypes = {
  shareButtonsImage: PropTypes.string.isRequired,
  isSuccessPage: PropTypes.bool,
}

CharityPlayBlock.defaultProps = {
  isSuccessPage: false,
}

export default React.memo(CharityPlayBlock)
