import React from 'react'
import classNames from 'classnames'

import Button from 'weplay-components/Button'
import PageSectionTitle from 'weplay-components/PageSectionTitle'

import styles from './styles.scss'

const AddSteam = () => (
  <div className={styles.steam}>
    <div className={styles.header}>
      <PageSectionTitle
        iconName="steam"
        text="Steam"
        className={styles.text}
      />
      <Button
        text="Connect"
      />
    </div>
    <div className={styles.status}>
      <span className={styles.statusTitle}>Steam ID:</span>
      <span className={styles.statusValue}>N/A</span>
    </div>
    <p className={
        classNames(
          styles.error,
          'u-color-error',
          'u-text-right',
        )
      }
    >
      Error message
    </p>
  </div>
)

export default AddSteam
