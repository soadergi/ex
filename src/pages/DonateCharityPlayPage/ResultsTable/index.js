import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { pluralTextName } from 'weplay-core/helpers/isSingular'

import LoadMoreButton from 'weplay-components/LoadMoreButton'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'

import { useCharityGame } from './container'
import ResultsTableItem from './ResultsTableItem'
import styles from './styles.scss'

const TOP_LEADERS_INDEX = 9

const ResultsTable = () => {
  const t = useTranslation()
  const {
    leaders,
    totalLeaders: count,
    isLoading,
    isLoadMoreAvailable,
    handleLoadMore,
  } = useCharityGame()

  if (!leaders) return null

  return (
    <ContentContainer>
      <h2 className={styles.title}>
        {t('charity.resultTable.title')}
      </h2>
      <p className={styles.indicator}>
        {`${count} ${t(`charity.resultTable.countPeople.${pluralTextName(count)}`)}`}
      </p>
      <table className={styles.ladderTable}>
        <tbody className={styles.body}>
          {leaders.map((leader, index) => (
            <ResultsTableItem
              key={leader.id}
              item={leader}
              isTop={index <= TOP_LEADERS_INDEX}
            />
          ))}
        </tbody>
      </table>
      {isLoadMoreAvailable && (
        <LoadMoreButton
          isLoading={isLoading}
          isVisible
          onClick={handleLoadMore}
          buttonText={t('button.loadMore')}
        />
      )}
    </ContentContainer>
  )
}

export default ResultsTable
