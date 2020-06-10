import React from 'react'
import { Route, Switch, Redirect } from 'react-router'
import { useSelector } from 'react-redux'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { getPrefix } from 'weplay-core/routes/_helpers'
import { NAMES } from 'weplay-core/routes'
import { PROFILE_PAGE_PATHS } from 'weplay-core/routes/profile'

import PageHelmet from 'weplay-components/PageHelmet'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import ProfileNavigation from 'weplay-components/ProfileNavigation/ProfileNavigation'

import MyArticlesHistory from 'weplay-media/sections/MyArticlesHistory'
import MyBookmarks from 'weplay-media/sections/MyBookmarks'
import MySubscriptions from 'weplay-media/sections/MySubscriptions'

import ProfileContent from './ProfileContent/ProfileContent'
import SocialAccounts from './ProfileContent/SocialAccounts'
import PremiumSubscription from './PremiumSubscription/PremiumSubscription'
import ProfileHeader from './ProfileHeader/ProfileHeader'
import styles from './styles.scss'

const ProfilePage = () => {
  const { locale } = useLocale()
  const isMobileWidth = useSelector(isMobileWidthSelector)
  return (
    <div
      className={styles.block}
      data-qa-id={dataQaIds.pages[NAMES.PROFILE].container}
    >

      <PageHelmet lokaliseProject="mediaCore" />

      <ProfileHeader />
      <ContentContainer>
        <div className={styles.grid}>
          {!isMobileWidth && <ProfileNavigation isDetailed />}
          <div className={styles.content}>
            <Switch>
              <Route
                exact
                path={`${getPrefix(locale)}${PROFILE_PAGE_PATHS.MY_BOOKMARKS}`}
                component={MyBookmarks}
              />
              <Route
                exact
                path={`${getPrefix(locale)}${PROFILE_PAGE_PATHS.BROWSING_HISTORY}`}
                component={MyArticlesHistory}
              />
              <Route
                exact
                path={`${getPrefix(locale)}${PROFILE_PAGE_PATHS.MY_SUBSCRIPTIONS}`}
                component={MySubscriptions}
              />
              <Route
                exact
                path={`${getPrefix(locale)}${PROFILE_PAGE_PATHS.PREMIUM_SUBSCRIPTION}`}
                component={PremiumSubscription}
              />
              <Route
                exact
                path={`${getPrefix(locale)}${PROFILE_PAGE_PATHS.PERSONAL_INFO}`}
                component={ProfileContent}
              />
              <Route
                exact
                path={`${getPrefix(locale)}${PROFILE_PAGE_PATHS.SIGN_IN_METHODS}`}
                component={SocialAccounts}
              />
              <Redirect to="/" />
            </Switch>
          </div>
        </div>
      </ContentContainer>
    </div>
  )
}
ProfilePage.propTypes = {
  // required props
  // container props
  // optional props
}

ProfilePage.defaultProps = {
  // optional props
}

export default React.memo(ProfilePage)
