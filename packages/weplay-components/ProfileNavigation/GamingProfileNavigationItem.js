import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { currentUserSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'
import transliterate from 'weplay-core/helpers/translit'

import Link from 'weplay-components/Link'

import Icon from '../Icon'

import styles from './styles.scss'

const DEFAULT_DISCIPLINE = 'cs-go'

const GamingProfileNavigationItem = ({
  handleMenuItemClick,
}) => {
  const currentUser = useSelector(currentUserSelector)
  const t = useTranslation()

  const gamingProfileUrl = useMemo(() => pathWithParamsByRoute(
    NAMES.MEMBER, {
      memberId: currentUser.id,
      memberName: transliterate(currentUser.nickname),
      discipline: DEFAULT_DISCIPLINE,
    },
  ), [currentUser.id, currentUser.nickname])

  return (
    <Link
      className={classNames(
        styles.itemWrap,
        styles.link,
      )}
      activeClassName={styles.isActive}
      to={gamingProfileUrl}
      onClick={handleMenuItemClick}
    >
      <div className={classNames(
        styles.wrapper,
      )}
      >
        <Icon
          iconName="profile"
          className="u-mr-1"
        />
        <span className={styles.content}>
          {t('navigationItem.gamingProfile')}
        </span>
      </div>
    </Link>
  )
}

GamingProfileNavigationItem.propTypes = {
  handleMenuItemClick: PropTypes.func.isRequired,
}

export default React.memo(GamingProfileNavigationItem)
