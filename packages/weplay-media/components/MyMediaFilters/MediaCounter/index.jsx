import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import styles from './styles.scss'
import container from './container'

const MediaCounter = ({
  // required props
  // props from container

  countResultText,
  userArticlesLoading,
  // optional props
}) => {
  const t = useTranslation()
  return (
    <>
      <span className={styles.counter}>
        { userArticlesLoading ? t('mediaCore.profile.loadingText') : countResultText }
      </span>
    </>
  )
}

MediaCounter.propTypes = {
  // required props
  // props from container
  countResultText: PropTypes.string.isRequired,
  userArticlesLoading: PropTypes.bool.isRequired,
  // optional props
}

MediaCounter.defaultProps = {
  // optional props
}

export default container(MediaCounter)
