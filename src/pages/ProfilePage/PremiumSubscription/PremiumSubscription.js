import React from 'react'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import {
  isPremiumSelector,
} from 'weplay-core/reduxs/_legacy/auth/reducer'
import { usdAmountSelector, wpPointsAmountSelector } from 'weplay-core/reduxs/wallets/reducer'

import PageSectionTitle from 'weplay-components/PageSectionTitle'

import styles from './styles.scss'
import BlockForPremiumUser from './BlockForPremiumUser/BlockForPremiumUser'
import BlockForRegularUser from './BlockForRegularUser/BlockForRegularUser'
import Treasury from './Treasury/Treasury'

const PremiumSubscription = () => {
  const t = useTranslation()

  const isPremium = useSelector(isPremiumSelector)
  const wpPointsAmount = useSelector(wpPointsAmountSelector)
  const usdAmount = useSelector(usdAmountSelector)
  const hasTreasury = Boolean(usdAmount || wpPointsAmount)

  return (
    <>
      <div
        data-event-amplitude-source="Account: Premium"
      >
        <PageSectionTitle
          text={t('competitive.profile.premium.title')}
        />
        <div className={styles.content}>
          {isPremium && (
            <BlockForPremiumUser />
          )}
          {!isPremium && (
            <BlockForRegularUser />
          )}
          {hasTreasury && (
            <Treasury
              wpPointsAmount={wpPointsAmount}
              usdAmount={usdAmount}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default React.memo(PremiumSubscription)
