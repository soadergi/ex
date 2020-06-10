import React from 'react'

import { useFileUploader } from './useFileUploader'

const withFileUploader = ({
  maxFileSize,
  maxWidth,
  maxHeight,
  staticServerHandler,
}) => WrappedComponent => (props) => {
  const {
    uploadFileToServer,
    parseFile,
  } = useFileUploader({
    maxFileSize,
    maxWidth,
    maxHeight,
    staticServerHandler,
  })

  return (
    <WrappedComponent
      {...props}
      uploadFileToServer={uploadFileToServer}
      parseFile={parseFile}
    />
  )
}

export default withFileUploader
