import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Icon from 'weplay-components/Icon'
import Link from 'weplay-components/Link'
import UserAvatar from 'weplay-components/UserAvatar'

import CropperModal from 'weplay-platform/components/Modals/CropperModal/CropperModal'

import styles from './AvatarBlock.scss'
import { useAvatarBlock } from './useAvatarBlock'

const AvatarBlock = ({
  isOnline,
}) => {
  const {
    avatarSrc,
    isPremiumAccount,
    readBase64AndStartCrop,
    placeholder,
    currentUser,
    closeCropModal,
    isCropModalVisible,
    selectedBase64Image,
    handleFileSelect,
    profileEditInfoLink,
    profileEditInfoText,
  } = useAvatarBlock()

  return (
    <div className={styles.block}>
      <div className={styles.section}>
        <div className={styles.userAvatar}>
          <UserAvatar
            avatar={avatarSrc}
            className={styles.avatar}
            isPremiumAccount={isPremiumAccount}
            size="128"
          />
          <label className={styles.overlay}>
            <input
              type="file"
              accept="image/jpeg, image/png, image/jpg, image/gif"
              onChange={readBase64AndStartCrop}
            />
            <Icon
              iconName="img-clear"
              className={styles.icon}
            />
            <span className={styles.placeholder}>
              {placeholder}
            </span>
          </label>
        </div>
        <div className={styles.content}>
          <p className={classNames(
            styles.name,
            { [styles.isOnline]: isOnline },
          )}
          >
            {currentUser?.nickname}
          </p>
          <p className={styles.info}>
            <Link
              to={profileEditInfoLink}
              className={styles.link}
            >
              {profileEditInfoText}
            </Link>
          </p>
        </div>
      </div>

      <CropperModal
        closeHandler={closeCropModal}
        isShown={isCropModalVisible}
        selectedBase64Image={selectedBase64Image}
        onCrop={handleFileSelect}
      />
    </div>
  )
}

AvatarBlock.propTypes = {
  isOnline: PropTypes.bool,
}

AvatarBlock.defaultProps = {
  isOnline: true,
}

export default AvatarBlock
