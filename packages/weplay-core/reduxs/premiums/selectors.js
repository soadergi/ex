import { createSelector } from 'reselect'

import { premiumsSelector } from 'weplay-core/reduxs/premiums/reducer'

export const sortedPremiumsSelector = createSelector(
  premiumsSelector,
  premiums => premiums?.subscriptions
    .sort((a, b) => a.period - b.period)
    .map((item, index) => ({ ...item, position: index + 1 })) ?? [],
)
