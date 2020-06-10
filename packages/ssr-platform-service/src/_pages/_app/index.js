import React from 'react'
import { createStore, applyMiddleware } from 'redux'
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
import { getHostByGlobalScope } from 'weplay-singleton/helpers/getHostByGlobalScope'
import {
  axios,
  configureAcceptLang,
  configureApiHost,
} from 'weplay-core/services/axios'
import { getTranslations } from 'weplay-core/helpers/languages'
import {
  CANT_STRINGIFY,
  safeStringify,
} from 'weplay-core/helpers/safeStringify'
import rootReducer from 'store/rootReducer'

import AppAdapter from './AppAdapter/AppAdapter'
import Providers from './Providers/Providers'
import GTM from './GTM/GTM'

const makeStore = initialState => createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk)),
)

const apiHostByEnvLabel = {
  localhost: 'https://api-dev.weplay.space',
  dev: 'https://api-dev.weplay.space',
  qa: 'https://api-qa.weplay.space',
  prod: 'https://api.weplay.tv',
}

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

class RootApp extends App {
  static async getInitialProps({
    Component, ctx, router,
  }) {
    let hostWithPort = ''
    let origin = ''
    // TODO: executed once on the server, maybe there is some better place for config
    if (typeof window === 'undefined') {
      // TODO: remove after lambda function apply
      // ======= remove after lambda function apply
      const host = process.env.HOST || 'localhost'
      const port = process.env.PORT || 3000
      hostWithPort = `${host}:${port}`
      const protocol = process.env.ENV_LABEL === 'localhost' ? 'http' : 'https'
      origin = `${protocol}://${hostWithPort}`
    } else {
      origin = window.origin
    }
    // TODO: think about normal solution
    const hasRuLang = ctx.asPath.split('/')[1] === 'ru'
    const initialLocale = hasRuLang ? 'ru' : router.query.language || 'en'
    configureAcceptLang(initialLocale)

    const pagePropsPromise = Component.getInitialProps
      ? Component.getInitialProps({
        ctx,
        router,
        initialLocale,
      })
      : {}
    const [pageProps, initialMessages] = await Promise.all([
      pagePropsPromise,
      getTranslations(initialLocale),
    ])
    const stringifiedProps = safeStringify(pageProps)
    if (stringifiedProps.status === CANT_STRINGIFY) {
      console.warn('CIRCULAR DEPENDENCY IN PAGE PROPS', stringifiedProps.parsed)
    }
    return {
      pageProps: stringifiedProps.parsed,
      origin,
      initialLocale,
      canonicalUrl: router.asPath.split('?')[0],
      initialMessages,
      isRenderdOnServer: ctx.isServer,
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
          <link
            rel="shortcut icon"
            href="/static/favicon.ico"
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
            href={`https://weplay.tv${canonicalUrl}`}
          />
        </Head>
        <GTM />
        <Providers
          store={store}
          router={router}
          origin={origin}
          initialLocale={initialLocale}
          initialMessages={initialMessages}
        >
          <AppAdapter
            globalScope={global}
            routesNode={(
              <Page
                {...pageProps}
                router={router}
                origin={origin}
              />
          )}
          />
        </Providers>
      </>
    )
  }
}

export default withRedux(makeStore)(RootApp)
