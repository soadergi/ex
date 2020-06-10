import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import { useFileUploader } from 'weplay-components/useFileUploader'

const ImageFileChooser = ({
  maxFileSize,
  staticServerHandler,
  onChange,
  onError,
}) => {
  const {
    uploadFileToServer,
    parseFile,
  } = useFileUploader({
    maxFileSize,
    staticServerHandler,
  })

  const handleUploadFile = useCallback((file) => {
    uploadFileToServer(file).then((res) => {
      onChange(res.link)
      onError(false)
    })
  }, [uploadFileToServer, onChange, onError])

  const handleInputFile = useCallback((event) => {
    const file = event.target.files[0]
    parseFile(file).then(
      () => handleUploadFile(file),
      error => onError(error.message === 'maxFileSize'),
    )
  }, [parseFile, handleUploadFile, onError])

  return (
    <input
      type="file"
      className="u-hidden"
      accept="image/jpeg, image/png, image/jpg"
      onInput={handleInputFile}
    />
  )
}

ImageFileChooser.propTypes = {
  maxFileSize: PropTypes.number,
  staticServerHandler: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
}

ImageFileChooser.defaultProps = {
  maxFileSize: 3072000,
}

export default ImageFileChooser
