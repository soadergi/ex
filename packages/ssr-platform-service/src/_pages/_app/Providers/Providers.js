import React from 'react'
import { Provider } from 'react-redux'
import LocaleProvider from 'weplay-singleton/LocaleProvider/LocaleProvider'
import { RoutesProvider } from 'weplay-singleton/RoutesProvider/RoutesProvider'
import RouterProvider from 'weplay-singleton/RouterProvider/RouterProvider'
import ModalsProvider from 'weplay-singleton/ModalsProvider/ModalsProvider'
import { getProjectPrefix, ROUTES } from 'weplay-core/routes'

import { getNextHref } from '../../../helpers/getNextHref'
import { NextLinkComponent } from '../NextLinkComponent/NextLinkComponent'

const prepareNextParams = (router) => {
  // TODO: implement robust structure like in getNextHref
  switch (router.route) {
    case '/news/[slug]':
    case '/ru/news/[slug]': {
      const nameParts = router.query.slug.split('-')
      const articleId = nameParts.slice(-1)[0]
      return {
        ...router.query,
        articleId,
        0: nameParts.slice(0, -1).join('-'),
      }
    }
    default:
      return router.query
  }
}
const value = {
  ROUTES,
  getProjectPrefix,
}
const modalInitialValues = {
  forgotPassword: false,
  signUp: false,
  login: false,
}

const Providers = ({
  store,
  router,
  origin,
  initialLocale,
  initialMessages,
  children,
}) => (
  <>
    <RouterProvider
      isNext
      router={router}
      getNextHref={getNextHref}
      origin={origin}
      LinkComponent={NextLinkComponent}
      prepareNextParams={prepareNextParams}
    >
      <RoutesProvider
        value={value}
      >
        <LocaleProvider
          initialLocale={initialLocale}
          initialMessages={initialMessages}
        >
          <Provider store={store}>
            <ModalsProvider modalInitialValues={modalInitialValues}>
              {children}
            </ModalsProvider>
          </Provider>
        </LocaleProvider>
      </RoutesProvider>
    </RouterProvider>
  </>
)

export default React.memo(Providers)
