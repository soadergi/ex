import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { PROFILE_PATHS } from 'weplay-core/routes/core'
import useAction from 'weplay-core/helpers/useAction'
import {
  currentUserSelector,
  isLoggedInSelector,
} from 'weplay-core/reduxs/_legacy/auth/reducer'
import { openLoginModal as openLoginModalAction } from 'weplay-core/reduxs/_legacy/modals/actions'
import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'

import Button, { BUTTON_COLOR } from 'weplay-components/Button'
import UserAvatar from 'weplay-components/UserAvatar'
import Link from 'weplay-components/Link'

import styles from './UserAuthControls.scss'

const UserAuthControls = ({ className }) => {
  const isLoggedIn = useSelector(isLoggedInSelector)
  const currentUser = useSelector(currentUserSelector)
  const { openLoginModal } = useAction({
    openLoginModal: openLoginModalAction,
  })
  const t = useTranslation()

  const linkUrl = pathWithParamsByRoute(NAMES.PROFILE, { section: PROFILE_PATHS.PERSONAL_INFO })
  const avatarPath = useMemo(() => currentUser?.avatar_path ?? '', [//eslint-disable-line
    currentUser,
  ])

  return (
    <div className={classNames(styles.block, className)}>
      {isLoggedIn ? (
        <Link
          to={linkUrl}
          target="_blank"
        >
          <div className={styles.avatarWrapper}>
            <UserAvatar
              avatar={avatarPath}
              size="48"
            />
            <span className={styles.name}>{currentUser?.nickname}</span>
          </div>
        </Link>
      ) : (
        /* TODO: @Andrew, this text is for 2048-page only */
        <Button
          color={BUTTON_COLOR.CTA}
          onClick={openLoginModal}
          className={styles.button}
        >
          {t('mediaCore.game2048.signInButton')}
        </Button>
      )}
    </div>
  )
}

UserAuthControls.propTypes = {
  className: PropTypes.string,
}

UserAuthControls.defaultProps = {
  className: '',
}

export default UserAuthControls
