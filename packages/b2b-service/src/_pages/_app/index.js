import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import Head from 'next/head'
import App from 'next/app'
import dynamic from 'next/dynamic'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import withRedux from 'next-redux-wrapper'
import 'weplay-core/styles/style.scss'
import 'weplay-core/sprites/dist/styles/sprite-styles.scss'
import 'weplay-core/sprites/dist/sprites/sprite.m.svg'
import 'weplay-core/sprites/dist/sprites/sprite.c.svg'
import 'weplay-core/sprites/dist/sprites/sprite.svg'
import { getNextHref } from 'b2b-service/src/helpers/getNextHref'
import Header from 'b2b-service/src/_pages/_app/Header/Header'
import Footer from 'b2b-service/src/_pages/_app/Footer/Footer'
import ResizeDetector from 'b2b-service/src/_pages/_app/ResizeDetector/ResizeDetector'
import HistoryDetector from 'b2b-service/src/_pages/_app/HistoryDetector/HistoryDetector'
import ContactUsModal from 'b2b-service/src/_pages/_app/ContactUsModal/ContactUsModal'
import { NextLinkComponent } from 'b2b-service/src/_pages/_app/NextLinkComponent/NextLinkComponent'
import GTM from 'b2b-service/src/_pages/_app/GTM/GTM'
import CommonSeoTags from 'b2b-service/src/_pages/_app/CommonSeoTags/CommonSeoTags'
import rootReducer from 'b2b-service/src/store/rootReducer'
import { ROUTES, getProjectPrefix } from 'b2b-service/src/routes'

import { isProd, devConsole } from 'helpers'

import ModalsProvider from 'weplay-singleton/ModalsProvider/ModalsProvider'
import RouterProvider from 'weplay-singleton/RouterProvider/RouterProvider'
import LocaleProvider from 'weplay-singleton/LocaleProvider/LocaleProvider'
import { RoutesProvider } from 'weplay-singleton/RoutesProvider/RoutesProvider'
import { getHostByGlobalScope } from 'weplay-singleton/helpers/getHostByGlobalScope'

import { getLokaliseUrl } from 'weplay-core/helpers/getLokaliseUrl'
import { CANT_STRINGIFY, safeStringify } from 'weplay-core/helpers/safeStringify'
import { axios, configureAcceptLang, configureApiHost } from 'weplay-core/services/axios'

import classes from './styles.scss'

const DEFAULT_PORT = 3000
const makeStore = initialState => createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)))
// TODO: fix this the way it works in ssr-platform
const prepareNextParams = router => router.query
// TODO: extract duplicated nextLoader, nextLink etc
//   TODO: remove ASAP, dirty hack to avoid dependcney of comopnents on next/dynamic
const nextLoader = ({
  loadModule,
  fallback,
  noSSR,
}) => dynamic(loadModule, {
  fallback,
  noSSR,
})
//   ENDTODO: remove ASAP, dirty hack to avoid dependcney of comopnents on next/dynamic
const modalInitialValues = {
  contactUs: false,
}
const apiHostByEnvLabel = {
  localhost: 'https://api-dev.weplay.space',
  dev: 'https://api-dev.weplay.space',
  qa: 'https://api-qa.weplay.space',
  prod: 'https://api.weplay.tv',
}

// TODO: executed once on the client, maybe there is some better place for config
if (typeof window === 'undefined') {
  //   TODO: remove ASAP, dirty hack to avoid dependcney of comopnents on next/dynamic
  global.loader = nextLoader
  //   ENDTODO: remove ASAP, dirty hack to avoid dependcney of comopnents on next/dynamic
  global.isProdOrAnalyze = false
  global.LOOKUP = '__LOOKUP__'
  const apiHost = apiHostByEnvLabel[process.env.ENV_LABEL || 'localhost']
  axios.defaults.baseURL = apiHost
  configureApiHost(apiHost)
} else {
  //   TODO: remove ASAP, dirty hack to avoid dependcney of comopnents on next/dynamic
  global.loader = nextLoader
  //   ENDTODO: remove ASAP, dirty hack to avoid dependcney of comopnents on next/dynamic
  window.isProdOrAnalyze = false
  window.LOOKUP = '__LOOKUP__'
  const apiHost = getHostByGlobalScope(window)
  axios.defaults.baseURL = apiHost
  configureApiHost(apiHost)
}
// ========== executed once on the client, maybe there is some better place for config
class MyApp extends App {
  static async getInitialProps({
    Component, ctx, router, store,
  }) {
    let hostWithPort = ''
    let origin = ''
    // TODO: executed once on the server, maybe there is some better place for config
    if (typeof window === 'undefined') {
      // TODO: remove after lambda function apply
      // ======= remove after lambda function apply
      const host = process.env.HOST || 'localhost'
      const port = process.env.PORT || DEFAULT_PORT
      hostWithPort = `${host}:${port}`
      const protocol = process.env.ENV_LABEL === 'localhost' ? 'http' : 'https'
      origin = `${protocol}://${hostWithPort}`
    } else {
      hostWithPort = window.location.host
      origin = window.origin
    }
    // TODO: think about normal solution
    const hasRuLang = ctx.asPath.split('/')[1] === 'ru'
    const initialLocale = hasRuLang ? 'ru' : (router.query.language || 'en')
    configureAcceptLang(initialLocale)

    const pagePropsPromise = Component.getInitialProps ? Component.getInitialProps({
      ctx,
      router,
      store,
      initialLocale,
    }) : {}
    const url = getLokaliseUrl({
      pathToFile: 'weplay-b2b',
      locale: initialLocale,
      isProd,
    })
    const initialMessagesPromise = axios.get(url).then(response => response.data)
    const [
      pageProps,
      initialMessages,
    ] = await Promise.all([
      pagePropsPromise,
      initialMessagesPromise,
    ])
    const stringifiedProps = safeStringify(pageProps)
    if (stringifiedProps.status === CANT_STRINGIFY) {
      devConsole.warn('CIRCULAR DEPENDENCY IN PAGE PROPS', stringifiedProps.parsed)
    }
    return {
      pageProps: stringifiedProps.parsed,
      origin,
      initialLocale,
      canonicalUrl: router.asPath.split('?')[0],
      initialMessages,
    }
  }

  render() {
    const {
      Component: Page,
      pageProps,
      store,
      router,
      origin,
      initialLocale,
      canonicalUrl,
      initialMessages,
    } = this.props
    return (
      <>
        <Head>
          <meta
            name="referrer"
            content="origin"
          />
          <link
            rel="shortcut icon"
            href="static/favicon.ico"
          />
          <link
            rel="preload"
            href="https://fonts.googleapis.com/css?display=swap&family=Rubik:300,400,400i,500,700&amp;subset=cyrillic"
            as="style"
          />
          <link
            href="https://fonts.googleapis.com/css?display=swap&family=Rubik:300,400,400i,500,700&amp;subset=cyrillic"
            rel="stylesheet"
          />
          <link
            rel="canonical"
            href={`https://about.weplay.tv${canonicalUrl}`}
          />
        </Head>
        <GTM />

        <RouterProvider
          router={router}
          getNextHref={getNextHref}
          origin={origin}
          LinkComponent={NextLinkComponent}
          prepareNextParams={prepareNextParams}
        >
          <LocaleProvider
            initialLocale={initialLocale}
            initialMessages={initialMessages}
          >
            <RoutesProvider value={{
              ROUTES,
              getProjectPrefix,
            }}
            >
              <Provider store={store}>
                <ModalsProvider modalInitialValues={modalInitialValues}>
                  <CommonSeoTags />
                  <HistoryDetector router={router} />
                  <ResizeDetector />
                  <Header />
                  <main className={classes.wrap}>
                    <Page
                      {...pageProps}
                      router={router}
                      origin={origin}
                    />
                  </main>
                  <ContactUsModal />
                  <Footer />
                </ModalsProvider>
              </Provider>
            </RoutesProvider>
          </LocaleProvider>
        </RouterProvider>
      </>
    )
  }
}

export default withRedux(makeStore)(MyApp)
