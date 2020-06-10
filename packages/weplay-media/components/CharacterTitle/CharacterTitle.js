import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './CharacterTitle.scss'

const CharacterTitle = ({
  title,
  text,
  isFull,
}) => (
  <>
    <h2 className={styles.title}>{title}</h2>
    {text && (
      <p className={classNames(
        styles.text,
        {
          [styles.full]: isFull,
        },
      )}
      >
        {text}
      </p>
    )}
  </>
)

CharacterTitle.propTypes = {
  title: PropTypes.string.isRequired,
  // optional props
  isFull: PropTypes.bool,
  text: PropTypes.string,
}

CharacterTitle.defaultProps = {
  text: '',
  isFull: false,
}

export default CharacterTitle
