import React from 'react'
import * as PropTypes from 'prop-types'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router'
import { PersistGate } from 'redux-persist/lib/integration/react'

import LocaleProvider from 'weplay-singleton/LocaleProvider/LocaleProvider'
import ModalsProvider from 'weplay-singleton/ModalsProvider/ModalsProvider'
import RouterProvider from 'weplay-singleton/RouterProvider/RouterProvider'
import { RoutesProvider } from 'weplay-singleton/RoutesProvider/RoutesProvider'

import ruGlobalNavigationTexts from 'weplay-core/globalNavigationTexts/ru'
import enGlobalNavigationTexts from 'weplay-core/globalNavigationTexts/en'
import { getLanguageFromLocation } from 'weplay-core/routes/_helpers'
import { getProjectPrefix, ROUTES } from 'weplay-core/routes'

import ReactLinkComponent from '../ReactLinkComponent'

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
  children,
  windowLocation,
  store,
  persistor,
}) => {
  const currentLanguage = getLanguageFromLocation(windowLocation)
  const globalNavigationTexts = currentLanguage === 'en' ? enGlobalNavigationTexts : ruGlobalNavigationTexts
  return (
    <BrowserRouter>
      <RouterProvider
        useHistory={useHistory}
        useLocation={useLocation}
        useParams={useParams}
        LinkComponent={ReactLinkComponent}
      >
        <RoutesProvider
          value={value}
        >
          <LocaleProvider
            initialLocale={currentLanguage}
            initialMessages={globalNavigationTexts}
          >
            <Provider store={store}>
              <PersistGate persistor={persistor}>
                <ModalsProvider
                  modalInitialValues={modalInitialValues}
                >
                  {children}
                </ModalsProvider>
              </PersistGate>
            </Provider>
          </LocaleProvider>
        </RoutesProvider>
      </RouterProvider>
    </BrowserRouter>
  )
}
Providers.propTypes = {
  children: PropTypes.node.isRequired,
  windowLocation: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  store: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
  persistor: PropTypes.shape({}).isRequired,
}
Providers.defaultProps = {}

export default Providers
