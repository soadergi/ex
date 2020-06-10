import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from 'weplay-components/Icon'
import Avatar from 'weplay-components/Avatar'
import useMemberInfo from 'weplay-competitive/hooks/useMemberInfo'

import styles from './styles.scss'

const sizes = [
  '',
  '24',
  '32',
  '40',
  '48',
  '64',
  '96',
  '128',
]

const PlayerAvatar = ({
  id,
  size,
  className,
  responsive,
  isPlaceholderDark,
}) => {
  const { memberInfo } = useMemberInfo(id)

  return (
    <div className={classNames(
      styles.block,
      className,
      styles[`size-${size}`],
      {
        [styles.isPremium]: memberInfo.isPremiumAccount,
        [styles[`size-${responsive.sm}-sm`]]: responsive.sm,
        [styles[`size-${responsive.md}-md`]]: responsive.md,
        [styles[`size-${responsive.lg}-lg`]]: responsive.lg,
      },
    )}
    >
      <Avatar
        avatar={memberInfo.avatar}
        alt={memberInfo.nickname}
        isPlaceholderDark={isPlaceholderDark}
        isPremiumAccount={memberInfo.isPremiumAccount}
      />
      {memberInfo.isPremiumAccount && (
        <span className={styles.iconWrapper}>
          <Icon
            iconName="premium"
            className={styles.icon}
          />
        </span>
      )}
    </div>
  )
}

PlayerAvatar.propTypes = {
  id: PropTypes.number.isRequired,
  size: PropTypes.oneOf(sizes),
  className: PropTypes.string,
  isPlaceholderDark: PropTypes.bool,
  responsive: PropTypes.shape({
    sm: PropTypes.string,
    md: PropTypes.string,
    lg: PropTypes.string,
  }),
}

PlayerAvatar.defaultProps = {
  size: '',
  className: '',
  isPlaceholderDark: false,
  responsive: {},
}

export default PlayerAvatar
