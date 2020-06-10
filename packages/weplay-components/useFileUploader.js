import * as R from 'ramda'

import useAction from 'weplay-core/helpers/useAction'
import { uploadFile as uploadFileAction } from 'weplay-core/reduxs/_legacy/auth/actions'

export const useFileUploader = ({
  maxFileSize,
  maxWidth,
  maxHeight,
  staticServerHandler,
}) => {
  const { uploadFile } = useAction({ uploadFile: uploadFileAction })

  const uploadFileToServer = file => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.addEventListener('loadend', () => {
      const formData = new FormData()
      formData.append('name', file.name)
      formData.append('file', file)
      formData.append('handler', staticServerHandler)
      uploadFile({
        body: formData,
      }, {
        headers: { 'Content-Type': 'multipart/form-data, boundary=--abc--abc--' },
      }).then(R.pipe(
        R.prop('data'),
        resolve,
      ), reject)
    })
    reader.readAsDataURL(file)
  })

  const parseFile = file => new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('noFile'))
    }
    const isCorrectSizeFile = !maxFileSize || file.size <= maxFileSize
    if (isCorrectSizeFile) {
      const image = new Image()
      image.addEventListener('load', (data) => {
        if (maxWidth && image.width > maxWidth) {
          reject(new Error('maxWidth'))
        } else if (maxHeight && image.height > maxHeight) {
          reject(new Error('maxHeight'))
        } else {
          resolve(data)
        }
      })
      image.addEventListener('error', reject)
      image.src = window.URL.createObjectURL(file)
    } else {
      reject(new Error('maxFileSize'))
    }
  })

  return {
    uploadFileToServer,
    parseFile,
  }
}
