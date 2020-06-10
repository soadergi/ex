import React from 'react'
import PropTypes from 'prop-types'
import paginationPropType from 'weplay-core/customPropTypes/paginationPropType'
import PageHelmet from 'weplay-components/PageHelmet'
import PaginationFooter from 'weplay-competitive/components/PaginationFooter'
import Section from 'weplay-competitive/components/Section'
import Match from 'weplay-competitive/components/MatchRaw/Match'
import CountIndicator from 'weplay-competitive/components/CountIndicator'
import MatchHeader from 'weplay-competitive/components/MatchRaw/MatchHeader'
import matchTableItemPropType from 'weplay-competitive/customPropTypes/matchTableItemPropType'
import WrapperOverflowX from 'weplay-competitive/components/WrapperOverflowX'
import Wrapper from 'weplay-competitive/components/Wrapper'
import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES } from 'weplay-core/routes'

import container from './container'
import styles from './styles.scss'

const AllMatchesPage = ({
  t,
  fetchedRecords,
  pagination,
  fetchByFiltersAndPagination,
  itemName,
  seoParams,
  // props from HOC
  discipline,
}) => (
  <Section
    title={t('competitive.match.allMatches.title')}
    isTitleH1
    containerClassName={styles.container}
  >
    <PageHelmet
      seoParams={seoParams}
    />
    <Wrapper>
      <CountIndicator className={styles.counter}>
        {fetchedRecords.length}
        {' '}
        {t('competitive.match.allMatches.count')}
      </CountIndicator>
    </Wrapper>
    <WrapperOverflowX>
      <table
        className={styles.table}
        data-qa-id={dataQaIds.pages[NAMES.MATCHES].container}
      >
        <MatchHeader discipline={discipline} />
        <tbody data-event-amplitude-source="All matches">
          {fetchedRecords.map(matchItem => (
            <Match
              key={matchItem.id}
              matchItem={matchItem}
            />
          ))}
        </tbody>
      </table>
    </WrapperOverflowX>
    <Wrapper>
      <PaginationFooter
        itemName={itemName}
        pagination={pagination}
        onPaginationChange={fetchByFiltersAndPagination}
      />
    </Wrapper>
  </Section>
)

AllMatchesPage.propTypes = {
  t: PropTypes.func.isRequired,
  fetchByFiltersAndPagination: PropTypes.func.isRequired,
  pagination: paginationPropType.isRequired,
  fetchedRecords: PropTypes.arrayOf(matchTableItemPropType).isRequired,
  itemName: PropTypes.string.isRequired,
  seoParams: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  discipline: PropTypes.string.isRequired,
}

export default container(AllMatchesPage)
