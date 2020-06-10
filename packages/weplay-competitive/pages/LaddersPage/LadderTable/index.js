import React from 'react'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { pluralTextName } from 'weplay-core/helpers/isSingular'

import InlineTabs from 'weplay-components/InlineTabs'
import Tab from 'weplay-components/Tab'
import Skeleton from 'weplay-components/Skeleton'

import LadderListing from 'weplay-competitive/components/LadderListing'
import PaginationFooter from 'weplay-competitive/components/PaginationFooter'
import CountIndicator from 'weplay-competitive/components/CountIndicator'

import useLadderTable from './useLadderTable'
import styles from './styles.scss'

const LadderTable = () => {
  const t = useTranslation()
  const {
    tabs,
    handleTabClick,
    activeTab,
    isLoading,
    pagination,
    fetchedRecords,
    itemName,
    handlePaginationChange,
  } = useLadderTable()
  return (
    <div
      className={classNames(
      )}
    >
      <InlineTabs
        hasSeparator
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

      <CountIndicator
        className={styles.indicator}
      >
        {isLoading
          ? (
            <Skeleton
              height="15px"
              width="150px"
            />
          )
          : `${pagination.total} ${t(`competitive.ladders.${pluralTextName(pagination.total)}`)}`}
      </CountIndicator>
      <>
        <div className="u-mb-4">
          {isLoading && (<Skeleton height="80px" />)}
          {!isLoading && (
            <LadderListing
              ladders={fetchedRecords}
              emptyStateText={t('competitive.member.emptyText.noTournamentsByFilter')}
            />
          )}
        </div>
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
  )
}

export default LadderTable
