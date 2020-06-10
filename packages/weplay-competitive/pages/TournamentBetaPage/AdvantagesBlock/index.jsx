import React from 'react'
import Icon from 'weplay-components/Icon'
import { Controller, Scene } from 'react-scrollmagic'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import Headline from 'weplay-components/HeadLine'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import Section from 'weplay-components/_wrappers/Section'

import NavigationBlocks from '../NavigationBlocks'

import styles from './styles.scss'

const AdvantagesBlock = () => {
  const t = useTranslation()

  return (
    <Section
      id="WeCompete"
      hasBorderBottom
    >
      <Controller>
        <Scene
          triggerElement="#WeCompete"
        >
          {(progress, event) => (
            <>
              <NavigationBlocks
                title="WeCompete"
                isInView={event.type === 'start'}
              />
              <ContentContainer>
                <Headline
                  className="u-text-center"
                  title={t('competitive.tournamentLanding.advantagesBlock.mainTitle')}
                />
                <div className={styles.content}>
                  <div>
                    <Icon
                      className={styles.icon}
                      iconName="present"
                      size="large"
                    />
                    <p className={styles.title}>
                      {t('competitive.tournamentLanding.advantagesBlock.titleFirst')}
                    </p>
                    <p className={styles.description}>
                      {t('competitive.tournamentLanding.advantagesBlock.descriptionFirst')}
                    </p>
                  </div>
                  <div>
                    <Icon
                      className={styles.icon}
                      iconName="controller"
                      size="large"
                    />
                    <p className={styles.title}>
                      {t('competitive.tournamentLanding.advantagesBlock.titleSecond')}
                    </p>
                    <p className={styles.description}>
                      {t('competitive.tournamentLanding.advantagesBlock.descriptionSecond')}
                    </p>
                  </div>
                  <div>
                    <Icon
                      className={styles.icon}
                      iconName="headset"
                      size="large"
                    />
                    <p className={styles.title}>
                      {t('competitive.tournamentLanding.advantagesBlock.titleThird')}
                    </p>
                    <p className={styles.description}>
                      {t('competitive.tournamentLanding.advantagesBlock.descriptionThird')}
                    </p>
                  </div>
                </div>
              </ContentContainer>
            </>
          )}
        </Scene>
      </Controller>
    </Section>
  )
}

export default AdvantagesBlock
