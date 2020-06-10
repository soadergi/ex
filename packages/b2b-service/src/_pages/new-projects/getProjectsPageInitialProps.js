import { devConsole } from 'helpers'
import { PROJECT_STATES } from 'config/projects'

import { $propEq } from 'weplay-core/$utils/$propEq'
import { getSubscriptionBlock } from 'weplay-core/reduxs/subscriptionBlocks/actions'

import { eventLocalizationsActions, eventLocalizationsSelectors } from 'reduxs/event-localizations'

const locationPage = 'weplay_business_general'

export const getProjectPageInitialProps = async ({ ctx, initialLocale }) => {
  const subscriptionParams = {
    params: {
      language: initialLocale,
      isActive: 1,
      locationPage,
      locationId: 0,
    },
  }

  // REQUESTS
  const subscription = await getSubscriptionBlock
    .request(subscriptionParams)(ctx.store.dispatch, ctx.store.getState)
    .then(res => res)
    .catch((err) => {
      devConsole.error('subscriptionPromise', err)
      return null
    })

  try {
    await eventLocalizationsActions.queryRecords.request({
      filter__state__eq: 'future',
      filter__language__eq: initialLocale,
      //  TODO: @Rohovoi need to add sorting by startDate when it will be available
    })(ctx.store.dispatch, ctx.store.getState)
  } catch (err) {
    devConsole.warn('no future projects', err)
  }
  try {
    await eventLocalizationsActions.queryRecords.request({
      filter__state__eq: 'completed',
      filter__language__eq: initialLocale,
      //  TODO: @Rohovoi need to add sorting by startDate when it will be available
    })(ctx.store.dispatch, ctx.store.getState)
  } catch (err) {
    devConsole.warn('no completed projects', err)
  }

  const store = ctx.store.getState()

  // SELECTORS
  const eventLocalizations = store |> eventLocalizationsSelectors.createRecordsByFilterSelector(
    () => $propEq('language', initialLocale),
  )
  const initialCompletedEvents = eventLocalizations
    .filter(localization => localization.event.state === PROJECT_STATES.COMPLETED)
  const initialPromoEvent = eventLocalizations
    .filter(localization => localization.event.state === PROJECT_STATES.FUTURE)
    .sort((a, b) => (a.event.tournamentData.startDate < b.event.tournamentData.startDate ? 1 : -1))
    .slice(0, 1)[0]

  return {
    // response data
    subscription,
    initialPromoEvent,
    initialCompletedEvents,
  }
}
