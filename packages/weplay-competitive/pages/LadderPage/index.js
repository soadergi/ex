import React, { useMemo, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'

import { useParams } from 'weplay-singleton/RouterProvider/useParams'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'
import { useHistory } from 'weplay-singleton/RouterProvider/useHistory'

import { goTo, NAMES } from 'weplay-core/routes'
import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import useAction from 'weplay-core/helpers/useAction'
import { pluralTextName } from 'weplay-core/helpers/isSingular'

import PageHelmet from 'weplay-components/PageHelmet'
import LoadMoreButton from 'weplay-components/LoadMoreButton'

import useDiscipline from 'weplay-competitive/hooks/useDiscipline'
import Section from 'weplay-competitive/components/Section'
import LadderTable from 'weplay-competitive/pages/LadderPage/LadderTable'
import CountIndicator from 'weplay-competitive/components/CountIndicator'
import { laddersSelectors, laddersActions } from 'weplay-competitive/reduxs/ladders'
import MMButton from 'weplay-competitive/components/MM/MMButton'
import LadderPageSeo from 'weplay-competitive/components/LadderPageSeo/LadderPageSeo'
import { AT__LADDER_SEO_TEXT } from 'weplay-competitive/analytics/amplitude'
import { LADDER_STATUSES } from 'weplay-competitive/constants/ladderStatuses'

import LadderRange from './LadderRange'
import { useScoresWithPagination } from './container'
import styles from './styles.scss'

const sectionModification = ['textWhite', 'ladderItem']
// eslint-disable-next-line no-unused-vars
const ogImage = 'https://static-prod.weplay.tv/2020-06-04/3ea237205f9b0edc9a86275a0d6a0dd8.122530-5FB0C5-3B839F.png'

const LadderPage = () => {
  const t = useTranslation()
  const { ladderId } = useParams()
  const history = useHistory()

  const { tournamentDiscipline } = useDiscipline()
  const { locale } = useLocale()
  const ladder = useSelector(
    laddersSelectors.createRecordByIdSelector(ladderId),
  )

  const { queryLaddersRequest } = useAction({
    queryLaddersRequest: laddersActions.queryRecords.request,
  })

  const handleBackToLadders = useCallback(
    () => goTo({
      name: NAMES.LADDERS,
      history,
      params: {
        discipline: tournamentDiscipline.url,
      },
    }),
    [history, tournamentDiscipline],
  )

  const seoParams = useMemo(
    () => ({
      discipline: tournamentDiscipline.name,
      ladderName: ladder?.name,
    }),
    [tournamentDiscipline, ladder],
  )

  useEffect(() => {
    queryLaddersRequest({
      filter__ladder_id__eq: ladderId,
    })
  }, [ladderId, locale])

  const {
    isLoadMoreAvailable,
    isLoading,
    scoresTotal,
    handleLoadScores,
  } = useScoresWithPagination({ ladderId })

  return (
    <div
      className={styles.page}
      data-qa-id={dataQaIds.pages[NAMES.LADDER].container}
    >
      <PageHelmet
        seoParams={seoParams}
        ogImage={ogImage}
      />
      <>
        <Section
          modifiers={sectionModification}
          title={ladder.name}
          iconSize="large"
          className={styles.hero}
          linkText={t('competitive.ladders.link.backToLadders')}
          linkIcon="arrow-link"
          linkHandler={handleBackToLadders}
          hasSectionButtonsGroup
        >
          <LadderRange ladder={ladder} />
        </Section>
        <div className={styles.wrap}>
          <CountIndicator className={styles.indicator}>
            {`${scoresTotal} ${t(`competitive.ladders.countPlayers.${pluralTextName(scoresTotal)}`)}`}
          </CountIndicator>
          <LadderTable
            prizes={ladder.ladderPrizes}
          />
          {scoresTotal === 0 && ladder.ladderStatus === LADDER_STATUSES.ONGOING && (
          <div className={styles.emptyLadder}>
            <p className={styles.titleText}>
              {t('competitive.ladders.emptyLadder')}
            </p>
            <MMButton />
          </div>
          )}
          {scoresTotal === 0 && ladder.ladderStatus === LADDER_STATUSES.FINISHED && (
          <div className={styles.emptyLadder}>
            <p className={styles.titleText}>
              {t('competitive.ladders.emptyLadderFinished')}
            </p>
          </div>
          )}
          {isLoadMoreAvailable && (
          <LoadMoreButton
            isLoading={isLoading}
            isVisible
            onClick={handleLoadScores}
            buttonText={t('button.loadMore')}
          />
          )}
        </div>
      </>
      <div data-event-amplitude-action={AT__LADDER_SEO_TEXT}>
        <LadderPageSeo />
      </div>
    </div>
  )
}

export default LadderPage
