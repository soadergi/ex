import _ from 'lodash'
import * as R from 'ramda'

export const getSubscriptionLocationFitScore = location => (subscription) => {
  const subscriptionLocations = R.pipe(
    R.propOr([], 'locations'),
    R.map(R.pipe(
      R.pick(['locationPage', 'locationId']),
      R.map(_.camelCase),
    )),
  )(subscription)
  const isLocationMatched = (locationPage, locationId) => R.contains(
    {
      locationPage,
      locationId,
    },
    subscriptionLocations,
  )
  if (isLocationMatched(location.page, `${location.id}`)) {
    return 3
  }
  if (isLocationMatched(location.page, '0')) {
    return 2
  }
  if (isLocationMatched('all', '0')) {
    return 1
  }
  return 0
}

export const getScopeSuccessData = (state, { payload }) => ({
  data: {
    ...payload,
    scopes: R.pipe(
      R.propOr([], 'scopes'),
      R.map(R.prop('id')),
    )(payload),
    token: R.propOr('', ['token'])(payload),
  },
  loading: false,
  error: null,
})

export const getSubscriptionErrorText = (error, i18nTexts, source) => {
  switch (R.prop('code', error)) {
    case 5:
      return i18nTexts[source].serverErrors.emailAlreadyExists
    case 3:
      return i18nTexts.subscribeForms.serverErrors.emailInvalid
    case 0:
      return i18nTexts.Notification['Something went wrong']
    default:
      return ''
  }
}
