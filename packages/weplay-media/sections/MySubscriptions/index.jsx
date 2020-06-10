import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import PageSectionTitle from 'weplay-components/PageSectionTitle'

import MyMediaFilters from 'weplay-media/components/MyMediaFilters'
import { SEARCH_TIMEOUT } from 'weplay-media/sections/config/myMedia'

import { SORT_OPTIONS } from './config'
import SubscriptionsList from './SubscriptionsList'
import container from './container'
import styles from './styles.scss'

const MySubscriptions = ({
  fetchedSubscriptionIds,
  viewOptions,
  handleViewOptionsChange,
  createAnalyticsWithAction,
}) => {
  const t = useTranslation()
  return (
    <div className={styles.block}>
      <PageSectionTitle
        text={t('mediaCore.profile.subscriptions.title')}
      />
      <div className={styles.content}>
        <MyMediaFilters
          viewOptions={viewOptions}
          dropdownOptions={SORT_OPTIONS}
          asyncSearchTimeout={SEARCH_TIMEOUT}
          onChange={handleViewOptionsChange}
          createAnalyticsWithAction={createAnalyticsWithAction}
        />
        <SubscriptionsList
          fetchedSubscriptionIds={fetchedSubscriptionIds}
          viewOptions={viewOptions}
          createAnalyticsWithAction={createAnalyticsWithAction}
        />
      </div>
    </div>
  )
}

MySubscriptions.propTypes = {
  fetchedSubscriptionIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  viewOptions: PropTypes.shape({
    sortType: PropTypes.string.isRequired,
    sortDesc: PropTypes.bool.isRequired,
    search: PropTypes.string.isRequired,
  }).isRequired,
  handleViewOptionsChange: PropTypes.func.isRequired,
  createAnalyticsWithAction: PropTypes.func.isRequired,
}

export default container(MySubscriptions)
