import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'

import MessageBanner from 'weplay-components/MessageBanner'
import SectionHeader from 'weplay-components/SectionHeader'

import SubscriptionsPropType from 'weplay-media/customPropTypes/subscriptionsPropType'
import messageImage from 'weplay-media/sections/img/telescope.svg'
import SubscriptionCard from 'weplay-media/components/SubscriptionCard'

import styles from './styles.scss'
import container from './container'
import NoSubscriptions from './NoSubscriptions'

const SubscriptionsList = ({
  // required props
  createAnalyticsWithAction,
  // container props
  t,
  isUserHasSubscriptions,
  userSubscriptions,
  restSubscriptions,
  // optional props
}) => (
  <>
    {!isUserHasSubscriptions && (
      <NoSubscriptions />
    )}
    {!userSubscriptions.length && !restSubscriptions.length && (
      <MessageBanner
        imageUrl={messageImage}
        title={t('mediaCore.profile.message.noResultTitle')}
      >
        <p className={styles.message}>
          {t('mediaCore.profile.message.noResultSubTitle')}
        </p>
      </MessageBanner>
    )}

    <div className={styles.block}>
      <div className={styles.content}>
        {userSubscriptions.map(userSubscription => (
          <SubscriptionCard
            key={userSubscription.id}
            subscription={userSubscription}
            createAnalyticsWithAction={createAnalyticsWithAction}
            isUserSubscribed
          />
        ))}
      </div>
    </div>

    {(isUserHasSubscriptions && !R.isEmpty(restSubscriptions)) && (
      <SectionHeader title={t('mediaCore.profile.subscriptions.stillNotSubscribed')} />
    )}

    <div className={styles.content}>
      {restSubscriptions.map(subscription => (
        <SubscriptionCard
          key={subscription.id}
          subscription={subscription}
          createAnalyticsWithAction={createAnalyticsWithAction}
        />
      ))}
    </div>
  </>
)

SubscriptionsList.propTypes = {
  // required props
  createAnalyticsWithAction: PropTypes.func.isRequired,
  // container props
  t: PropTypes.func.isRequired,
  isUserHasSubscriptions: PropTypes.bool.isRequired,
  userSubscriptions: SubscriptionsPropType.isRequired,
  restSubscriptions: SubscriptionsPropType.isRequired,
  // optional props
}

export default container(SubscriptionsList)
