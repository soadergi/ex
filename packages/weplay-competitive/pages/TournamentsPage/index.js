import PropTypes from 'prop-types'
import React, { useMemo } from 'react'

import imgPropType from 'weplay-core/customPropTypes/imgPropType'
import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES } from 'weplay-core/routes'

import PageHelmet from 'weplay-components/PageHelmet'
import HashAnchor from 'weplay-components/HashAnchor'

import tournamentPropType from 'weplay-competitive/customPropTypes/tournamentPropType'
import gameModePropType from 'weplay-competitive/customPropTypes/gameModePropType'
import Section from 'weplay-competitive/components/Section'
import Wrapper from 'weplay-competitive/components/Wrapper'
import SeoBlock from 'weplay-competitive/components/SeoBlock'
import container from 'weplay-competitive/pages/TournamentsPage/container'
import TournamentsTable from 'weplay-competitive/pages/TournamentsPage/TournamentsTable'
import FeaturedTournaments from 'weplay-competitive/pages/TournamentsPage/FeaturedTournaments'
import useFeatureSupport from 'weplay-competitive/hooks/useFeatureSupport'
import { FEATURES } from 'weplay-competitive/config/features'
import CompetitionTabs from 'weplay-competitive/components/CompetitionTabs'
import useDiscipline from 'weplay-competitive/hooks/useDiscipline'
import { AT__TOURNAMENTS_LIST_SEO_TEXT } from 'weplay-competitive/analytics/amplitude'

import styles from './styles.scss'
import SeoFAQScript from './SeoFAQScript'

const sectionModification = ['textWhite']

const TournamentsPage = ({
  // required props

  // container props
  fetchedRecords: featuredTournaments,
  t,
  seoParams,
  activeGameModeFilter,
  backgroundSrc,
  gameModes,
  // params from HOCs
  discipline,
}) => {
  const image = useMemo(() => ({
    backgroundImage: `url(${backgroundSrc ?? ''})`,
  }), [backgroundSrc])
  const { isFeatureSupported } = useFeatureSupport()
  const { tournamentDiscipline } = useDiscipline()

  return (
    <div
      className={styles.page}
      data-qa-id={dataQaIds.pages[NAMES.TOURNAMENT].container}
    >
      <PageHelmet
        seoParams={seoParams}
        ogImage={backgroundSrc}
      />
      <SeoFAQScript />

      <Wrapper className={styles.seo}>
        <div data-event-amplitude-action={AT__TOURNAMENTS_LIST_SEO_TEXT}>
          <SeoBlock activeGameModeFilter={activeGameModeFilter} />
        </div>
      </Wrapper>

      <div
        className={styles.hero}
        style={image}
      >
        {featuredTournaments.length ? (
          <Section
            modifiers={sectionModification}
            title={t(`competitive.tournament.discipline.${discipline}`)}
            icon={discipline}
            iconSize="large"
            className="u-pt-3"
            hasSectionButtonsGroup
          >
            {isFeatureSupported(FEATURES.LADDER) && tournamentDiscipline.hasLadders && (
              <CompetitionTabs />
            )}
            {(!isFeatureSupported(FEATURES.LADDER) || !tournamentDiscipline.hasLadders) && (
              <>
                <h2 className={styles.topTitle}>
                  {t('competitive.tournaments.featured.title')}
                </h2>
                <p className={styles.topSubTitle}>
                  {t('competitive.tournaments.featured.subtitle')}
                </p>
              </>
            )}
            <FeaturedTournaments
              featuredTournaments={featuredTournaments}
            />
          </Section>
        ) : null}
      </div>
      <HashAnchor anchorId="list" />
      <Section className="u-pb-4">
        <TournamentsTable
          discipline={discipline}
          gameModes={gameModes}
        />
      </Section>
    </div>
  )
}

TournamentsPage.propTypes = {
  fetchedRecords: PropTypes.arrayOf(tournamentPropType).isRequired,
  t: PropTypes.func.isRequired,
  seoParams: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  activeGameModeFilter: PropTypes.oneOfType([
    gameModePropType,
    PropTypes.shape({}),
  ]).isRequired,
  backgroundSrc: imgPropType.isRequired,
  gameModes: PropTypes.arrayOf(gameModePropType).isRequired,
  // props fom HOCs
  discipline: PropTypes.string.isRequired,
}

export default container(TournamentsPage)
