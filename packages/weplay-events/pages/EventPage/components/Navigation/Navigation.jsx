import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Scrollbars } from 'react-custom-scrollbars'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import withRouteInfo from 'weplay-core/routes/withRouteInfo'
import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'

import Link from 'weplay-components/Link'
// import Label from 'weplay-components/Label'
import Section from 'weplay-components/_wrappers/Section'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'

import routeConfigPropType from 'weplay-events/customPropTypes/routeConfigPropType'

import NavigationTooltip from './NavigationTooltip'
import styles from './Navigation.scss'

const Navigation = ({ match, routeInfo, routesConfig }) => {
  const t = useTranslation()
  const currentRoute = pathWithParamsByRoute(NAMES.EVENT_PAGE, match.params)
  const list = useRef(null)
  const scrollbars = useRef(null)

  useEffect(() => {
    if (!list?.current || !scrollbars?.current) {
      return
    }

    const width = list.current.offsetWidth
    const activeRouteIndex = routesConfig.findIndex(route => route.name === routeInfo.name)
    const pos = width * (activeRouteIndex / routesConfig.length)
    scrollbars.current.scrollLeft(pos)
    // @Anton I pass routeInfo.name as a dep because I don't want to scroll just on initial render of component
  }, [list, routesConfig, scrollbars])

  return (
    <Section className="u-pt-8 u-pb-0">
      <ContentContainer>
        <div className={styles.block}>
          <Scrollbars
            autoHide
            autoHeight
            autoHeightMin={42}
            ref={scrollbars}
          >
            <div
              className={styles.content}
              ref={list}
            >
              {routesConfig.map(route => (
                <Link
                  key={route.label}
                  to={route.url ? `${currentRoute}/${route.url}` : currentRoute}
                  className={classNames(
                    styles.link,
                    { [styles.isDisable]: route.disabled },
                  )}
                  disabled={route.disabled}
                >
                  <span className={classNames([styles.label, routeInfo.name === route.name && styles.active])}>
                    {t(`events.seoBlock.${route.url || 'overview'}`)}
                  </span>

                  {/*
                  {route.isNew && (
                    <Label
                      color="magenta"
                      className={styles.isNew}
                    >
                      {t('events.header.submenu.label')}
                    </Label>
                  )}
                  */}
                </Link>
              ))}
            </div>
          </Scrollbars>

          <NavigationTooltip
            title={t('events.tooltip.title')}
            text={t('events.tooltip.text')}
          />
        </div>
      </ContentContainer>
    </Section>
  )
}

Navigation.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      tournamentSlug: PropTypes.string,
    }).isRequired,
  }).isRequired,
  routeInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  routesConfig: PropTypes.arrayOf(routeConfigPropType).isRequired,
}

export default React.memo(withRouteInfo(Navigation))
