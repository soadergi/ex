import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'
import authorPropType from 'weplay-core/customPropTypes/authorPropType'

import Link from 'weplay-components/Link'
import BottomArticles from 'weplay-components/BottomArticles'
import MessageBanner from 'weplay-components/MessageBanner'

import messageImage2 from './img/milky-way.svg'
import messageImage from './img/uranus.svg'
import container from './container'
import styles from './styles.scss'
import WelcomeBanner from './WelcomeBanner'

const NoArticles = ({
  // required props
  // props from container
  first3Articles,
  isLoggedIn,
  isDeletedArticles,
  isUserArticlesEmpty,
  handleHomeLinkClick,
  pageName,
  // optional props
  hasLink,
}) => {
  const t = useTranslation()
  return (
    <>
      {!isLoggedIn && (
        <WelcomeBanner
          title={t(`mediaCore.profile.${pageName}.welcomeTitle`)}
          text={t(`mediaCore.profile.${pageName}.welcomeText`)}
        />
      )}
      {isDeletedArticles && (
        <MessageBanner
          imageUrl={messageImage2}
          title={t(`mediaCore.profile.${pageName}.deletedTitle`)}
        >
          <p className={styles.message}>
            {/* TODO: @Andrew, localise-key from browsingHistory-page is empty. */}
            {t(`mediaCore.profile.${pageName}.deletedSubTitle`)}
          </p>
        </MessageBanner>
      )}
      {isUserArticlesEmpty && (
        <MessageBanner
          imageUrl={messageImage}
          title={t(`mediaCore.profile.${pageName}.atFirstTime`)}
        >
          <p className={styles.message}>
            {t(`mediaCore.profile.${pageName}.atFirstTimePartOne`)}
            {hasLink && (
              <>
                <Link
                  to={pathWithParamsByRoute(NAMES.MEDIA)}
                  className={styles.messageLink}
                  onClick={handleHomeLinkClick}
                >
                  {t(`mediaCore.profile.${pageName}.atFirstTimeLink`)}
                </Link>
                {t(`mediaCore.profile.${pageName}.atFirstTimePartTwo`)}
              </>
            )}
          </p>
        </MessageBanner>
      )}
      <BottomArticles
        title={t('mediaCore.profile.recentArticlesTitle')}
        linkUrl="/media"
        linkText={t('mediaCore.profile.recentArticlesLink')}
        articles={first3Articles}
      />
    </>
  )
}

NoArticles.propTypes = {
  // required props
  // props from container
  first3Articles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    linkUrl: PropTypes.string,
    date: PropTypes.string,
    author: authorPropType,
    authorLink: PropTypes.string,
    url: PropTypes.string,
    published_date: PropTypes.string,
    publishedDate: PropTypes.string,
  }).isRequired).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isUserArticlesEmpty: PropTypes.bool.isRequired,
  isDeletedArticles: PropTypes.bool.isRequired,
  handleHomeLinkClick: PropTypes.func.isRequired,
  pageName: PropTypes.string.isRequired,
  // optional props
  hasLink: PropTypes.bool,
}

NoArticles.defaultProps = {
  // optional props
  hasLink: true,
}

export default container(NoArticles)
