import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Section from 'weplay-components/_wrappers/Section'

import SubscribeBanner from 'weplay-events/components/SubscribeBanner'

import styles from './styles.scss'

export default function SubscriptionBanner() {
  const t = useTranslation()

  return (
    <Section className="u-py-0">
      <SubscribeBanner
        title={t('events.subscribeBanner.title')}
        description={t('events.subscribeBanner.description')}
        withSocialShare
      >
        {/* TODO: @Anton investigate why LazyImage doesn't always render image */}
        <img
          className={styles.image}
          src="https://static-prod.weplay.tv/2020-06-09/182932ba0c10936cf9e29e81fd6a9aea.383230-BD9C73-6B9FAF.png"
          alt="axe"
        />
      </SubscribeBanner>
    </Section>
  )
}
