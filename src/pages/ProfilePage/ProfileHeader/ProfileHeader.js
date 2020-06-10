import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import toaster, { TOAST_TYPE } from 'weplay-core/services/toastNotifications'
import { userBackgroundAvatarSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import useAction from 'weplay-core/helpers/useAction'
import { updateUser as updateUserAction } from 'weplay-core/reduxs/_legacy/auth/actions'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import BackgroundImg from 'weplay-components/BackgroundImg'
import Icon from 'weplay-components/Icon'

import AvatarBlock from './AvatarBlock/AvatarBlock'
import ImageFileChooser from './ImageFileChooser/ImageFileChooser'
import styles from './ProfileHeader.scss'

const ProfileHeader = () => {
  const [background, setBackground] = useState('')

  const userBackgroundAvatar = useSelector(userBackgroundAvatarSelector)
  const { updateUser } = useAction({ updateUser: updateUserAction })

  const t = useTranslation()

  const handleBackgroundChange = useCallback((backgroundLink) => {
    updateUser({
      body: { background_avatar: backgroundLink },
    }, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then(() => setBackground(backgroundLink))
  })

  const handleFileSizeLimitError = (isError) => {
    if (isError) {
      toaster.showNotification({
        type: TOAST_TYPE.ERROR,
        content: t('competitive.member.profile.recommended'),
      })
    }
  }

  useEffect(() => {
    if (userBackgroundAvatar) setBackground(userBackgroundAvatar)
  }, [userBackgroundAvatar, setBackground])

  return (
    <>
      <div className={styles.coverWrap}>
        {background && (
          <BackgroundImg src={background} />
        )}
        <ContentContainer>
          <div className={styles.content}>
            <div className={styles.cover}>
              <label className={styles.label}>
                <span className={styles.text}>{t('competitive.member.profile.cover')}</span>
                <Icon iconName="image" />
                <ImageFileChooser
                  staticServerHandler="tournament"
                  onChange={handleBackgroundChange}
                  onError={handleFileSizeLimitError}
                />
              </label>
            </div>
            <div className={styles.control}>
              <AvatarBlock />
            </div>
          </div>
        </ContentContainer>
      </div>
    </>
  )
}

export default ProfileHeader
