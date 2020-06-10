import React from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'weplay-components/Skeleton'

import styles from './styles.scss'
import container from './container'

const TextBlock = ({
  // required props
  content,
  // container props
  handleContentRef,
  // optional props
}) => (
  <div
    ref={handleContentRef}
    className={styles.block}
  >
    {content ? <div dangerouslySetInnerHTML={{ __html: content }} /> : <p><Skeleton count={15} /></p>}
  </div>
)

TextBlock.propTypes = {
  content: PropTypes.string,
  handleContentRef: PropTypes.func.isRequired,
}

TextBlock.defaultProps = {
  content: null,
}

export default container(TextBlock)
