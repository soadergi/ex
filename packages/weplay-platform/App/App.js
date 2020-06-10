import React, { useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import ReactResizeDetector from 'react-resize-detector'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import { getSocialLinks } from 'weplay-core/consts/socialLinks'
import { getGlobalMenu } from 'weplay-core/helpers/mockedMenuAPI'
import { setGlobalCSSVar } from 'weplay-core/helpers/setGlobalCSSVar'
import useAction from 'weplay-core/helpers/useAction'
import { saveHeaderHeight } from 'weplay-core/reduxs/_legacy/layout/actions'
import { headerHeightSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
import { getLanguageFromLocation } from 'weplay-core/routes/_helpers'
import { isPlainPage } from 'weplay-core/routes/plainPages'
import enGlobalNavigationTexts from 'weplay-core/globalNavigationTexts/en.json'
import ruGlobalNavigationTexts from 'weplay-core/globalNavigationTexts/ru.json'
import withRouteInfo from 'weplay-core/routes/withRouteInfo'

import NotConnectedPageHelmet from 'weplay-components/PageHelmet/NotConnectedPageHelmet'
import Header from 'weplay-components/Header/Header'
import Footer from 'weplay-components/Footer'

import ErrorBoundary from './ErrorBoundary'
import Main from './Main'
import Configurator from './Configurator/Configurator'
import MobileTournamentInfo from './MobileTournamentInfo'
import ServiceBanner from './ServiceBanner'
import StickyHeadResizeDetector from './StickyHeadResizeDetector/StickyHeadResizeDetector'
import styles from './styles.scss'

const STICKY_HEIGHT_CSS_VAR = 'wp-sticky-section-height'
const App = ({
  history,
  location,
  routeInfo,
  globalScope,
  children,
  liveStreamUrl,
  tournament,
  tournamentLinkUrl,
  locale,

  getCustomSubMenu,
}) => {
  const currentLanguage = useMemo(() => getLanguageFromLocation(location), [location])
  const isGlobalNavigationHidden = useMemo(() => isPlainPage(location.pathname), [location])
  const globalNavigationTexts = useMemo(
    () => (currentLanguage === 'en' ? enGlobalNavigationTexts : ruGlobalNavigationTexts), [currentLanguage],
  )
  const navigationMenu = useMemo(() => getGlobalMenu(currentLanguage), [currentLanguage])
  const headerHeight = useSelector(headerHeightSelector)
  const { setHeaderHeight } = useAction({ setHeaderHeight: saveHeaderHeight })
  const onResize = useCallback(
    (width, height) => {
      if (headerHeight !== height) {
        setHeaderHeight(height)
        setGlobalCSSVar({
          globalScope,
          varName: STICKY_HEIGHT_CSS_VAR,
          varValue: `${height}px`,
        })
      }
    },
    [globalScope, headerHeight, setHeaderHeight],
  )

  return (
    <Configurator>
      <div className={styles.block}>
        {!isGlobalNavigationHidden && (
        <div
          className={styles.stickySection}
          id="StickySectionPortal"
        >
          <div>
            <ServiceBanner />
            <Header
              routeInfo={routeInfo}
              navigationMenu={navigationMenu}
              socialPageLinks={getSocialLinks(locale, 'pages')}
              getCustomSubMenu={getCustomSubMenu}
            />
            <StickyHeadResizeDetector globalScope={globalScope} />
          </div>
          <MobileTournamentInfo
            tournament={tournament}
            tournamentLinkUrl={tournamentLinkUrl}
            liveStreamUrl={liveStreamUrl}
          />
          <ReactResizeDetector
            handleHeight
            onResize={onResize}
          />
        </div>
        )}
        <NotConnectedPageHelmet
          currentLanguage={currentLanguage}
          i18nTexts={globalNavigationTexts}
          globalScope={globalScope}
          routeInfo={routeInfo}
          location={location}
        />
        <main className={classNames(
          styles.wrapper,
          { [styles.fullHeight]: isGlobalNavigationHidden },
        )}
        >
          <ErrorBoundary>
            <Main
              history={history}
              location={location}
            >
              {children}
            </Main>
          </ErrorBoundary>
        </main>
        {!isGlobalNavigationHidden && (
        <Footer
          currentLanguage={currentLanguage}
          i18nTexts={globalNavigationTexts}
        />
        )}
      </div>
    </Configurator>
  )
}

App.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  routeInfo: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  globalScope: PropTypes.shape({}).isRequired,
  children: PropTypes.node.isRequired,
  locale: PropTypes.string.isRequired,
  getCustomSubMenu: PropTypes.func.isRequired,
  // optional
  liveStreamUrl: PropTypes.string,
  tournamentLinkUrl: PropTypes.string,
  tournament: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    logoUrl: PropTypes.string,
    logoAlt: PropTypes.string,
    shortName: PropTypes.string,
  }),
}

App.defaultProps = {
  tournament: undefined,
  tournamentLinkUrl: '',
  liveStreamUrl: '',
}

export default withLocale(withRouteInfo(App))
