import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'
import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'
import withRouter from 'weplay-singleton/RouterProvider/withRouter'
import useAction from 'weplay-core/helpers/useAction'
import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'
import { getSubscriptionBlock } from 'weplay-core/reduxs/subscriptionBlocks/actions'
import {
  isSubscriptionBlockAlreadyFetchedSelector,
  isSubscriptionBlockLoadingSelector,
} from 'weplay-core/reduxs/subscriptionBlocks/reducer'
import { createSubscriptionByLocationSelector } from 'weplay-core/reduxs/subscriptions/reducer'
import SimpleSubscribeForm from 'weplay-components/SubscribeForms/SimpleSubscribeForm'

const subscriptionPageName = 'general'

const mapPropsToLocation = () => ({
  page: subscriptionPageName,
  id: 0,
})

const footerChildrenMods = ['light']
const isClient = typeof window !== 'undefined'
const FooterSubscribeFormPortal = ({
  // required props

  // container props
  // optional props
}) => {
  const { locale } = useLocale()
  const isSubscriptionBlockAlreadyFetched = useSelector(isSubscriptionBlockAlreadyFetchedSelector(mapPropsToLocation))
  const isSubscriptionBlockLoading = useSelector(isSubscriptionBlockLoadingSelector)
  const subscriptionBlock = useSelector(createSubscriptionByLocationSelector(mapPropsToLocation))
  const globalScope = useSelector(globalScopeSelector)
  const { requestSubscriptionBlock } = useAction({
    requestSubscriptionBlock: getSubscriptionBlock.request,
  })

  useEffect(() => () => {
    if (!isSubscriptionBlockAlreadyFetched && !isSubscriptionBlockLoading) {
      requestSubscriptionBlock({
        params: {
          language: locale,
          isActive: 1,
          locationPage: subscriptionPageName,
          locationId: 0,
        },
      })
    }
  }, [locale])

  return isClient && createPortal(
    <>
      <SimpleSubscribeForm
        subscriptionBlock={subscriptionBlock}
        modifiers={footerChildrenMods}
      />
    </>,
    globalScope.document.getElementById('FooterSubscribeFormPortal'),
  )
}

FooterSubscribeFormPortal.propTypes = {
  // required props

  // container props

  // optional props
}

FooterSubscribeFormPortal.defaultProps = {
  // optional props
}

export default withRouter(FooterSubscribeFormPortal)
