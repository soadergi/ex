import React from 'react'
import PropTypes from 'prop-types'
import AuthorInline from 'weplay-components/AuthorInline'

import container from './container'
import styles from './styles.scss'

const ColumnistThoughts = ({
  title,
  text,
}) => (
  <div className={styles.block}>
    <p className={styles.title}>{title}</p>
    <p className={styles.text}>{text}</p>
    <AuthorInline
      authorName="Name"
      authorAvatar=""
      authorLink=""
      columnist
      modification={['authorNameLight']}
    />
  </div>
)

ColumnistThoughts.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default container(ColumnistThoughts)
