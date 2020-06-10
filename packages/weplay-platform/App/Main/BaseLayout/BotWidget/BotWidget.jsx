import React, {
  useEffect, useMemo, useCallback, useState,
} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import cookies from 'js-cookie'
import Icon from 'weplay-components/Icon'
import Image from 'weplay-components/Image'
import { useSelector } from 'react-redux'
import routeInfoPropType from 'weplay-core/customPropTypes/routeInfoPropType'
import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
import { PROJECT_PREFIXS } from 'weplay-core/routes'
import withRouteInfo from 'weplay-core/routes/withRouteInfo'
import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import bots from './img/bot-avatar.png'
import BotWidgetContent from './BotWidgetContent/BotWidgetContent'
import styles from './BotWidget.scss'

export const BotWidgetMarkup = ({
  // required props
  // container props
  routeInfo,
  location,
  // optional props
}) => {
  const isMobileWidth = useSelector(isMobileWidthSelector)
  const { locale } = useLocale()
  const isVisible = routeInfo.project === PROJECT_PREFIXS.MEDIA_PROJECT_PREFIX && locale === 'ru'
  const [isClosed, setClosed] = useState(false)
  const handleClose = useCallback(
    () => {
      setClosed(true)
      cookies.set('tiBotWidgetClosed', {
        expires: new Date(new Date().getTime() + (1000 * 60 * 60 * 24)),
      })
    },
    [],
  )

  const [isOpenedByUser, setOpenedByUser] = useState(false)
  const openContent = useCallback(
    () => setOpenedByUser(true),
    [],
  )

  const {
    isWidgetHidden,
    widgetContentVisible,
  } = useMemo(() => ({
    isWidgetHidden: Boolean(cookies.get('tiBotWidgetClosed')) || isClosed,
    widgetContentVisible: isMobileWidth ? isOpenedByUser : !isMobileWidth,
  }), [
    isClosed,
    isOpenedByUser,
    isMobileWidth,
  ])
  useEffect(() => () => {
    if (location.search.includes('?utm_source=discord')
        || location.search.includes('?utm_source=telegram')) {
      handleClose()
    }
  }, [])

  return isVisible ? (
    <div
      className={classNames(
        styles.block,
        { [styles.isVisible]: !isWidgetHidden },
      )}
    >
      <button
        type="button"
        className={styles.detailsButton}
        onClick={openContent}
      >
        <Image
          src={bots}
          alt="bots"
          className="o-img-responsive"
        />
      </button>
      {widgetContentVisible && (

        <div className={styles.popupWrap}>
          <div className={styles.popup}>
            <button
              type="button"
              className={styles.buttonClose}
              onClick={handleClose}
            >
              <Icon
                iconName="close"
                className={styles.iconClose}
                size="small"
              />
            </button>
            <BotWidgetContent closeWidget={handleClose} />
          </div>
        </div>
      )}
    </div>
  ) : null
}

BotWidgetMarkup.propTypes = {
  // required props
  // container props
  routeInfo: routeInfoPropType.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  // optional props
}

BotWidgetMarkup.defaultProps = {
  // optional props
}

export default withRouteInfo(BotWidgetMarkup)
