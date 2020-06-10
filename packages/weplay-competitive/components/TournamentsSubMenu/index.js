/* eslint-disable max-lines */

import { useSelector } from 'react-redux'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { useMemo, useCallback } from 'react'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { useLocation } from 'weplay-singleton/RouterProvider/useLocation'

import withAnalytics from 'weplay-core/HOCs/withAnalytics'
import transliterate from 'weplay-core/helpers/translit'
import { isTabletWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'
import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'

import Icon from 'weplay-components/Icon'
import SvgIcon from 'weplay-components/SvgIcon'
import Link from 'weplay-components/Link'

import { DISCORD_LINK } from 'weplay-competitive/constants/externalLinks'
import { TOURNAMENT_DISCIPLINES } from 'weplay-competitive/config/disciplines'
import {
  GA__MY_PROFILE_NAVIGATION,
  GA__HELP_CENTER_NAVIGATION,
  GA__DISCORD_NAVIGATION,
  GA__EMAIL_NAVIGATION,
} from 'weplay-competitive/analytics'
import {
  AT__MENU_GAMING_PROFILE,
  AT__MENU_ZENDESK,
  AT__MENU_DISCORD,
  AT__PREMIUM_MENU,
  AT__MENU_SUPPORT_EMAIL,
  AT__MENU_DISCIPLINE,
} from 'weplay-competitive/analytics/amplitude'
import { defaultDisciplineSelector } from 'weplay-competitive/reduxs/defaultDiscipline/reducer'
import { currentMemberSelector } from 'weplay-competitive/reduxs/members/selectors'
import useMMActiveMatch from 'weplay-competitive/hooks/MM/useMMActiveMatch'
import useFeatureSupport from 'weplay-competitive/hooks/useFeatureSupport'
import { FEATURES } from 'weplay-competitive/config/features'

import styles from './styles.scss'

const TournamentsSubMenu = ({
  // required props
  // container props
  closeMobileMenu,
  // optional props
  // props from HOCs
  logAnalytics,
}) => {
  const t = useTranslation()
  const { locale } = useLocale()
  const location = useLocation()
  const { isFeatureSupported } = useFeatureSupport()
  const { isActiveMMMatch, linkToActiveMMMatch } = useMMActiveMatch()
  const currentMember = useSelector(currentMemberSelector)
  const defaultDiscipline = useSelector(defaultDisciplineSelector)
  const isTablet = useSelector(isTabletWidthSelector)

  // TODO: @rbogdanov refactor plz into ids compare
  const isShowActiveMMMatch = useMemo(
    () => isFeatureSupported(FEATURES.MM)
      && isActiveMMMatch
      && location.pathname.indexOf(linkToActiveMMMatch) === -1,
    [isActiveMMMatch, isFeatureSupported, location, linkToActiveMMMatch],
  )

  const handleLinkClick = useCallback((analyticEvent) => {
    if (analyticEvent) {
      logAnalytics(analyticEvent)
    }
    if (isTablet) {
      closeMobileMenu()
    }
  }, [isTablet, logAnalytics, closeMobileMenu])

  const zendeskLink = useMemo(
    () => (locale === 'en'
      ? 'https://weplayhelp.zendesk.com/hc/en-us'
      : 'https://weplayhelp.zendesk.com/hc/ru'),
    [locale],
  )

  const myGamingProfileLink = useMemo(() => pathWithParamsByRoute(
    NAMES.MEMBER,
    {
      memberId: currentMember.id,
      memberName: transliterate(currentMember?.user?.nickname ?? ''),
      discipline: defaultDiscipline.name,
    },
  ), [currentMember, defaultDiscipline])

  const premiumLink = pathWithParamsByRoute(NAMES.PREMIUM)

  return (
    <div className={styles.block}>
      <ul className={styles.list}>

        {TOURNAMENT_DISCIPLINES.map(tournamentDiscipline => (
          <li
            className={styles.item}
            key={tournamentDiscipline.name}
          >
            <Link
              to={pathWithParamsByRoute(
                NAMES.TOURNAMENTS,
                {
                  discipline: tournamentDiscipline.url,
                },
              )}
              activeClassName={styles.isActive}
              className={styles.link}
              onClick={handleLinkClick}
              {...getAnalyticsAttributes({
                'amplitude-action': AT__MENU_DISCIPLINE,
                'amplitude-discipline': tournamentDiscipline.name,
              })}
            >
              <Icon
                size="small"
                className={styles.icon}
                iconName={tournamentDiscipline.icons.iconName}
              />
              {tournamentDiscipline.name}
            </Link>
          </li>
        ))}
      </ul>
      <ul className={classNames(
        styles.list,
        styles.right,
      )}
      >
        {currentMember.isFetched && (
          <>
            {isShowActiveMMMatch
              && (
                <li className={styles.item}>
                  <Link
                    exact
                    to={linkToActiveMMMatch}
                    activeClassName={styles.isActive}
                    className={classNames(
                      styles.link,
                      styles.linkPlay,
                    )}
                  >
                    <SvgIcon
                      size="medium"
                      iconName="play-green"
                      type="color"
                      className={classNames(
                        styles.icon,
                        styles.iconPlay,
                      )}
                    />
                    <span className={styles.linkTextPlay}>
                      {t('competitive.headerLinks.activeMatch')}
                    </span>
                  </Link>
                </li>
              )}
            <li className={styles.item}>
              <Link
                exact
                to={myGamingProfileLink}
                onClick={() => handleLinkClick(GA__MY_PROFILE_NAVIGATION)}
                activeClassName={styles.isActive}
                className={styles.link}
                {...getAnalyticsAttributes({
                  'amplitude-action': AT__MENU_GAMING_PROFILE,
                })}
              >
                <Icon
                  size="small"
                  iconName="profile"
                  className={styles.icon}
                />
                {t('competitive.headerLinks.myProfile')}
              </Link>
            </li>
          </>
        )}

        <li className={classNames(styles.item, styles.itemDivider)}>
          <Link
            exact
            to={premiumLink}
            activeClassName={styles.isActive}
            className={classNames(
              styles.link,
              styles.isPremium,
            )}
            onClick={handleLinkClick}
            {...getAnalyticsAttributes({
              'amplitude-action': AT__PREMIUM_MENU,
            })}
          >
            <Icon
              size="small"
              className={classNames(
                styles.icon,
                styles.premiumIcon,
              )}
              iconName="premium"
            />
            {t('competitive.headerLinks.premium')}
          </Link>
        </li>
        <li className={styles.item}>
          <a
            href={DISCORD_LINK}
            target="_blank"
            rel="noreferrer noopener"
            className={styles.link}
            onClick={() => handleLinkClick(GA__DISCORD_NAVIGATION)}
            {...getAnalyticsAttributes({
              'amplitude-action': AT__MENU_DISCORD,
            })}
          >
            <Icon
              size="small"
              iconName="discord"
              className={classNames(
                styles.icon,
                styles.iconSolo,
              )}
            />
            <span className={styles.linkText}>
              {t('competitive.headerLinks.discord')}
            </span>
          </a>
        </li>
        <li className={styles.item}>
          <a
            href={zendeskLink}
            target="_blank"
            rel="noreferrer noopener"
            className={styles.link}
            onClick={() => handleLinkClick(GA__HELP_CENTER_NAVIGATION)}
            {...getAnalyticsAttributes({
              'amplitude-action': AT__MENU_ZENDESK,
            })}
          >
            <Icon
              size="small"
              iconName="question"
              className={classNames(
                styles.icon,
                styles.iconSolo,
              )}
            />
            <span className={styles.linkText}>
              {t('competitive.headerLinks.helpCenter')}
            </span>
          </a>
        </li>
        <li className={styles.item}>
          <a
            href="mailto:support@weplay.tv"
            rel="noreferrer noopener"
            className={styles.link}
            onClick={() => handleLinkClick(GA__EMAIL_NAVIGATION)}
            {...getAnalyticsAttributes({
              'amplitude-action': AT__MENU_SUPPORT_EMAIL,
            })}
          >
            <Icon
              size="small"
              iconName="email"
              className={classNames(
                styles.icon,
                styles.iconSolo,
              )}
            />
            <span className={styles.linkText}>
              {t('competitive.headerLinks.support')}
            </span>
          </a>
        </li>
      </ul>
    </div>
  )
}

TournamentsSubMenu.propTypes = {
  logAnalytics: PropTypes.func.isRequired,
  closeMobileMenu: PropTypes.func,
}

TournamentsSubMenu.defaultProps = {
  closeMobileMenu: () => null,
}

export default withAnalytics(TournamentsSubMenu)
