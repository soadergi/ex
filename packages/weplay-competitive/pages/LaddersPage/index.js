import React, { useMemo } from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES } from 'weplay-core/routes'

import PageHelmet from 'weplay-components/PageHelmet'

import CompetitionTabs from 'weplay-competitive/components/CompetitionTabs'
import Section from 'weplay-competitive/components/Section'
import LadderPageSeo from 'weplay-competitive/components/LadderPageSeo/LadderPageSeo'
import { AT__LADDERS_SEO_TEXT } from 'weplay-competitive/analytics/amplitude'

import styles from './styles.scss'
import { useLaddersPage } from './useLaddersPage'
import { useTopPriorityLadders } from './useTopPriorityLadders'
import TopPriorityLadders from './TopPriorityLadders'
import TopPriorityLadder from './TopPriorityLadder'
import LadderTable from './LadderTable'

const sectionModification = ['textWhite']
// eslint-disable-next-line no-unused-vars
const ogImage = 'https://static-prod.weplay.tv/2020-06-04/3ea237205f9b0edc9a86275a0d6a0dd8.122530-5FB0C5-3B839F.png'

const LaddersPage = ({
  // required props
}) => {
  const t = useTranslation()
  const {
    seoParams,
    tournamentDiscipline,
    backgroundImageStyle,
  } = useLaddersPage()
  const { topPriorityLadders } = useTopPriorityLadders()
  // TODO: This is temporary for showing just one ladder (later we will use only topPriorityLadders)
  const [topPriorityLadder] = useMemo(
    () => topPriorityLadders,
    [topPriorityLadders],
  )

  return (
    <div
      className={styles.page}
      data-qa-id={dataQaIds.pages[NAMES.LADDERS].container}
    >
      <PageHelmet
        seoParams={seoParams}
        ogImage={ogImage}
      />
      <div
        className={styles.hero}
        style={backgroundImageStyle}
      >
        <Section
          modifiers={sectionModification}
          title={t(`competitive.tournament.discipline.${tournamentDiscipline.url}`)}
          icon={tournamentDiscipline.url}
          iconSize="large"
          className="u-pt-3"
          hasSectionButtonsGroup
        >
          <CompetitionTabs />
          {/* TODO: This is temporary for showing just one big ladder @Tetiana clean up it later */}
          {topPriorityLadders?.length === 1 && (
            <TopPriorityLadder
              ladder={topPriorityLadder}
            />
          )}
          {topPriorityLadders?.length > 1 && (
            <TopPriorityLadders
              topPriorityLadders={topPriorityLadders}
            />
          )}
        </Section>
      </div>
      <Section className="u-pb-4">
        <LadderTable
          discipline={tournamentDiscipline.name}
        />
      </Section>
      <div data-event-amplitude-action={AT__LADDERS_SEO_TEXT}>
        <LadderPageSeo />
      </div>
    </div>
  )
}

LaddersPage.propTypes = {

}

export default LaddersPage
