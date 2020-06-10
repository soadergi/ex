import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.scss'
import container from './container'

const Info = ({
  // required props
  info,
}) => (
  <div className={styles.block}>
    <div className={styles.column}>
      {info.map(infoItem => (
        <div
          key={infoItem.title}
        >
          <p className={styles.title}>{infoItem.title}</p>
          <p className={styles.description}>{infoItem.description}</p>
        </div>
      ))}
    </div>
  </div>
)

Info.propTypes = {
  // required props
  info: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  })).isRequired,

  // container props
  i18nTexts: PropTypes.shape({}).isRequired,

  // optional props
}

Info.defaultProps = {
  // optional props
}

export default container(Info)
