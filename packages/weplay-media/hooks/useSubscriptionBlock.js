import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import { getSubscriptionBlock } from 'weplay-core/reduxs/subscriptionBlocks/actions'
import { createSubscriptionByLocationSelector } from 'weplay-core/reduxs/subscriptions/reducer'

export const useSubscriptionBlock = ({
  locationPage,
  locationId,
}) => {
  const dispatch = useDispatch()
  const mapPropsToLocation = () => ({ page: locationPage, id: locationId })
  const { locale } = useLocale()

  const subscriptionBlock = useSelector(createSubscriptionByLocationSelector(mapPropsToLocation))

  useEffect(() => {
    if (!subscriptionBlock) {
      dispatch(getSubscriptionBlock.request({
        params: {
          language: locale,
          isActive: 1,
          locationPage,
          locationId,
        },
      }))
    }
  }, [dispatch, locationId, locationPage, locale, subscriptionBlock])

  return subscriptionBlock
}
