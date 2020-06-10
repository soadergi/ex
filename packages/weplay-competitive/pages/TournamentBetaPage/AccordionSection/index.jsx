import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Controller, Scene } from 'react-scrollmagic'
import withLocale from 'weplay-singleton/LocaleProvider/withLocale'
import Headline from 'weplay-components/HeadLine'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import Section from 'weplay-components/_wrappers/Section'
import Image from 'weplay-components/Image'
import withTabs from 'weplay-components/withTabs'

import NavigationBlocks from '../NavigationBlocks'

import styles from './styles.scss'

const AccordionSection = ({
  // required props

  // container props
  t,
  locale,
  tabs,
  activeTab,
  handleTabClick,
  // optional props
}) => (
  <Section
    hasBorderBottom
    id="WeWin"
  >
    <Controller>
      <Scene
        triggerElement="#WeWin"
      >
        {(progress, event) => (
          <>
            <NavigationBlocks
              title="WeWin"
              isInView={event.type === 'start'}
            />
            <ContentContainer>
              <Headline
                className="u-text-center"
                title={t('competitive.tournamentLanding.accordionSection.title')}
              />
            </ContentContainer>
            <div className={styles.block}>
              <div className={styles.accordion}>
                {tabs.map(tab => (
                  <div
                    key={tab.id}
                    onClick={handleTabClick(tab)}
                    className={styles.section}
                  >
                    <div className={classNames(
                      styles.item,
                      {
                        [styles.isActive]: activeTab.id === tab.id,
                      },
                    )}
                    >
                      <p className={classNames(
                        styles.link,
                        {
                          [styles.isActive]: activeTab.id === tab.id,
                        },
                      )}
                      >
                        {t(`competitive.tournamentLanding.accordionSection.tab.${tab.id}.title`)}
                      </p>
                      <div className={styles.wrapper}>
                        <div className={classNames(
                          styles.content,
                          {
                            [styles.isActive]: activeTab.id === tab.id,
                          },
                        )}
                        >
                          {t(`competitive.tournamentLanding.accordionSection.tab.${tab.id}.text`)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.images}>
                {tabs.map(tab => (
                  <Image
                    key={tab.id}
                    src={tab.url[locale]}
                    alt="tournament"
                    className={classNames(
                      'o-img-responsive',
                      styles.image,
                      {
                        [styles.isActive]: activeTab.id === tab.id,
                      },
                    )}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </Scene>
    </Controller>
  </Section>
)

AccordionSection.propTypes = {
  // required props
  t: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  // container props
  tabs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleTabClick: PropTypes.func.isRequired,
  activeTab: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  // optional props
}

AccordionSection.defaultProps = {
  // optional props
}

export default withLocale(withTabs(AccordionSection))
