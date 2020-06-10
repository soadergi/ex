import { compose } from 'recompose'

import withFileUploader from 'weplay-components/withFileUploader'

const container = compose(
  withFileUploader({
    maxFileSize: 3072000,
  }),
)

export default container
