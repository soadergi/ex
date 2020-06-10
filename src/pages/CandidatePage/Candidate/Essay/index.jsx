import React from 'react'
import PropTypes from 'prop-types'
import { Scrollbars } from 'react-custom-scrollbars'

import styles from './styles.scss'
import container from './container'

const Essay = ({ description }) => (
  <div className={styles.wrapper}>
    <Scrollbars
      autoHide
      className={styles.scrollbar}
    >
      <div className={styles.content}>
        <p className={styles.text}>{description}</p>
      </div>
    </Scrollbars>
  </div>
)

Essay.propTypes = {
  description: PropTypes.string,
}

Essay.defaultProps = {
  description: '',
}

export default container(Essay)
