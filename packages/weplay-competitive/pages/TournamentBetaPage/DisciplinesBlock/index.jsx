import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'

import Headline from 'weplay-components/HeadLine'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import Section from 'weplay-components/_wrappers/Section'
import Link from 'weplay-components/Link'

import { Controller, Scene } from 'react-scrollmagic'
import PropTypes from 'prop-types'
import React from 'react'

import NavigationBlocks from '../NavigationBlocks'
import TournamentBetaButton from '../TournamentBetaButton'

import DisciplineItem from './DisciplineItem'
import styles from './styles.scss'

const DisciplinesBlock = ({
  // required props
  handleDisciplineClick,
  // container props
  disciplines,
  // optional props
}) => {
  const t = useTranslation()

  return (
    <Section
      hasBorderBottom
      className={styles.block}
      id="WeDevelop"
    >
      <Controller>
        <Scene
          triggerElement="#WeDevelop"
        >
          {(progress, event) => (
            <ContentContainer>
              <NavigationBlocks
                title="WeDevelop"
                isInView={event.type === 'start'}
              />
              <div className={styles.wrapper}>
                <Headline
                  className="u-text-center"
                  title={t('competitive.tournamentLanding.disciplinesBlock.mainTitle')}
                />
                <p className={styles.description}>
                  {t('competitive.tournamentLanding.disciplinesBlock.description')}
                </p>
                <ul className={styles.content}>
                  {disciplines.map(discipline => (
                    <li key={discipline.icons.iconStyle}>
                      {discipline.access.type !== 'disabled'
                        ? (
                          <Link
                            to={pathWithParamsByRoute(NAMES.TOURNAMENTS, { discipline: discipline.url })}
                            className={styles.link}
                            onClick={handleDisciplineClick}
                          >
                            <DisciplineItem
                              iconStyle={discipline.icons.iconStyle}
                              iconName={discipline.icons.iconName}
                              isActive
                              disciplineName={discipline.name}
                            />
                          </Link>
                        )
                        : (
                          <DisciplineItem
                            iconStyle={discipline.icons.iconStyle}
                            iconName={discipline.icons.iconName}
                            isActive={false}
                          />
                        )}
                    </li>
                  ))}
                </ul>
                <div className={styles.buttonWrapper}>
                  <TournamentBetaButton
                    content={t('competitive.tournamentLanding.heroSection.button')}
                  />
                </div>
              </div>
            </ContentContainer>
          )}
        </Scene>
      </Controller>
    </Section>
  )
}

DisciplinesBlock.propTypes = {
  // required props

  // container props
  disciplines: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleDisciplineClick: PropTypes.func.isRequired,
  // optional props
}

DisciplinesBlock.defaultProps = {
  // optional props

  // container props
}

export default DisciplinesBlock
