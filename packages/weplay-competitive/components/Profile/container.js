import {
  compose, withHandlers, withStateHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withAnalytics from 'weplay-core/HOCs/withAnalytics'

import withFileUploader from 'weplay-components/withFileUploader'

import withDiscipline from 'weplay-competitive/HOCs/withDiscipline'

const container = compose(
  withFileUploader({
    maxFileSize: 3072000,
    staticServerHandler: 'tournament',
  }),
  connect(createStructuredSelector({

  }), {
    // actionCreators
  }),
  withStateHandlers({
    selectedFile: null,
    hasErrorSizeOfImage: false,
  }, {
    updateError: () => hasErrorSizeOfImage => ({ hasErrorSizeOfImage }),
    updateSelectedFile: () => ({ selectedFile, hasErrorSizeOfImage }) => ({
      selectedFile,
      hasErrorSizeOfImage,
    }),
  }),
  withHandlers({
    handleInputFile: ({
      parseFile,
      updateSelectedFile,
      uploadFileToServer,
      handleFileUpload,
      updateError,
    }) => (event) => {
      const file = event.target.files[0]
      parseFile(file).then(() => {
        updateSelectedFile({
          selectedFile: file,
          hasErrorSizeOfImage: false,
        })
        uploadFileToServer(file).then(handleFileUpload)
      }, (error) => {
        updateError(error.message === 'maxFileSize')
      })
    },
  }),
  withAnalytics,
  withDiscipline,
)

export default container
