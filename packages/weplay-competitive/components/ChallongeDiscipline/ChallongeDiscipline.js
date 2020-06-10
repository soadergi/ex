import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Tab from 'weplay-components/Tab'
import InlineTabs from 'weplay-components/InlineTabs'
import HashAnchor from 'weplay-components/HashAnchor'
import PageHelmet from 'weplay-components/PageHelmet'
import BackgroundImg from 'weplay-components/BackgroundImg'
import Skeleton from 'weplay-components/Skeleton'

import SeoAll from 'weplay-competitive/components/SeoBlock/SeoAll'
import SeoText from 'weplay-competitive/components/SeoText'
import Wrapper from 'weplay-competitive/components/Wrapper'
import Section from 'weplay-competitive/components/Section'
import CountIndicator from 'weplay-competitive/components/CountIndicator'
import PaginationFooter from 'weplay-competitive/components/PaginationFooter'
import useTimelineTabs from 'weplay-competitive/hooks/useTimelineTabs'
import usePagination from 'weplay-competitive/hooks/usePagination'

import Banner from './Banner'
import TournamentsListing from './TournamentsListing'
import useChallongeDiscipline from './useChallongeDiscipline'
import useChallongeRequest from './useChallongeRequest'
import styles from './styles.scss'
import { DEFAULT_QUERY_VALUES, getTabs } from './tableConfig'

const SMALL_SIZE = 1210
const MEDIUM_SIZE = 1740
const BIG_SIZE = 2100
const widths = [SMALL_SIZE, MEDIUM_SIZE, BIG_SIZE]

const ChallongeDiscipline = () => {
  const t = useTranslation()
  const tabs = getTabs(t)
  const {
    activeTab,
    handleTabClick,
    activeTabFilter,
  } = useTimelineTabs(tabs)

  const {
    pageOffset,
    pageLimit,
    pagination,
    setPagination,
    itemName,
    handlePaginationChange,
  } = usePagination({ name: 'tournaments', defaultQueryValues: DEFAULT_QUERY_VALUES })

  const {
    isLoading,
    fetchedRecords,
  } = useChallongeRequest()

  const {
    backgroundSrc,
    seoParams,
    disciplineUrl: discipline,
    sortedAndPaginatedTournaments,
    tournamentsCount,
  } = useChallongeDiscipline({
    activeTab,
    pageOffset,
    pageLimit,
    filter: activeTabFilter,
    fetchedRecords,
    setPagination,
  })

  return (
    <div className={styles.page}>
      <PageHelmet
        seoParams={seoParams}
        subPageName={discipline}
      />
      <div className={styles.hero}>
        <BackgroundImg
          src={backgroundSrc}
          className={styles.background}
          sizes="(max-width: 40em) 1210px, (max-width: 75em) 1740px, 2100px"
          widths={widths}
        />
        <div className={styles.wrapper}>
          <Wrapper>
            <Banner discipline={discipline} />
          </Wrapper>
        </div>
      </div>
      <Wrapper>
        <HashAnchor anchorId={`${discipline}-tournaments`} />
        <Section
          className="u-pt-6"
          title={t(`competitive.${discipline}.seo.title`)}
        >
          <div className={styles.reverseContent}>
            <Wrapper className={styles.seo}>
              <SeoText>
                <SeoAll
                  discipline={discipline}
                  localizationText={`competitive.seo.tournamentsPage.${discipline}.all`}
                />
              </SeoText>
            </Wrapper>
            <InlineTabs
              hasSeparator
              className="u-mb-3"
            >
              {tabs.map(tab => (
                <Tab
                  key={tab.id}
                  tab={tab.title}
                  handleClick={() => handleTabClick(tab)}
                  activeTab={tab.id === activeTab.id}
                />
              ))}
            </InlineTabs>
            <div className="u-mb-6">
              <>
                {
                  !isLoading
                    ? (
                      <CountIndicator
                        className="u-mb-3"
                      >
                        {
                      t(
                        'competitive.tournaments.tournamentsTable.subtitle.numberOfTournamnets',
                        { number: tournamentsCount },
                      )
                    }
                      </CountIndicator>
                    )
                    : (
                      <Skeleton
                        height="15px"
                        width="150px"
                      />
                    )
                }
                {isLoading && (<Skeleton height="80px" />)}
                {!isLoading && (
                <div className="u-mb-4">
                  <TournamentsListing
                    tournaments={sortedAndPaginatedTournaments}
                    emptyStateText={t('competitive.member.emptyText.noTournamentsByFilter')}
                  />
                </div>
                )}
                {!isLoading && (
                  <PaginationFooter
                    itemName={itemName}
                    pagination={pagination}
                    onPaginationChange={handlePaginationChange}
                    hideLimit
                  />
                )}
              </>
            </div>
          </div>
        </Section>
      </Wrapper>
    </div>
  )
}

export default React.memo(ChallongeDiscipline)
