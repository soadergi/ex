import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useSelector } from 'react-redux'

import { camelizeKeys } from 'weplay-singleton/camelizeKeys'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { pathWithParamsByRoute } from 'weplay-core/routes'
import { NAMES, PROFILE_PATHS } from 'weplay-core/routes/core'
import useAction from 'weplay-core/helpers/useAction'
import { updateUser as updateUserAction } from 'weplay-core/reduxs/_legacy/auth/actions'
import { currentUserSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import toaster, { TOAST_TYPE } from 'weplay-core/services/toastNotifications'

import { useFileUploader } from 'weplay-components/useFileUploader'

export const useAvatarBlock = () => {
  const [avatarSrc, setAvatarSrc] = useState(null)
  const [selectedBase64Image, setSelectedBase64Image] = useState('')
  const [isCropModalVisible, setIsCropModalVisible] = useState(false)

  const currentUser = camelizeKeys(useSelector(currentUserSelector))
  const { updateUser } = useAction({ updateUser: updateUserAction })

  const t = useTranslation()
  const {
    parseFile,
    uploadFileToServer,
  } = useFileUploader({
    maxFileSize: 3072000,
    maxWidth: 500,
    maxHeight: 500,
    staticServerHandler: 'avatar:media',
  })

  const placeholder = useMemo(() => t(`cabinet.${avatarSrc ? 'placeholder' : 'placeholderUpload'}`), [avatarSrc])
  const isPremiumAccount = useMemo(() => Boolean(currentUser?.isPremiumAccount), [currentUser])
  const profileEditInfoLink = pathWithParamsByRoute(NAMES.PROFILE, { section: PROFILE_PATHS.PERSONAL_INFO })
  const profileEditInfoText = t('mediaCore.profile.header.editInfo')

  const closeCropModal = useCallback(() => setIsCropModalVisible(false), [setIsCropModalVisible])
  const readBase64AndStartCrop = useCallback((event) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setSelectedBase64Image(e.target.result)
      setIsCropModalVisible(true)
    }
    reader.readAsDataURL(event.target.files[0])
  })

  const handleUploadError = useCallback((error) => {
    let content
    if (error.message === 'maxFileSize') {
      content = t('cabinet.isLargeSize')
    } else if (error.message === 'maxWidth' || error.message === 'maxHeight') {
      content = t('cabinet.isLargeDimensions')
    } else {
      content = t('text.somethingWentWrong')
    }
    toaster.showNotification({
      type: TOAST_TYPE.ERROR,
      content,
    })
  })

  const handleFileSelect = useCallback((file) => {
    parseFile(file).then(() => {
      uploadFileToServer(file).then((res) => {
        updateUser({
          body: { avatar_path: res.path },
        }, {
          headers: { 'Content-Type': 'application/json' },
        }).then(() => setAvatarSrc(res.path))
      }, error => handleUploadError(error))
    })
  })

  useEffect(() => {
    if (currentUser?.avatarPath) setAvatarSrc(currentUser.avatarPath)
  }, [currentUser, setAvatarSrc])

  return {
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
  }
}
