import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from 'weplay-components/Icon'

import VideoList from './VideoList'
import ArticleList from './ArticleList'
import container from './container'
import styles from './styles.scss'

const PromoBlock = ({
  i18nTexts,
  videos,
  formTitle,
  formText,
  isUserSubscribed,
  first3Articles,
  showArticles,
  showVideos,
}) => (
  <div className={classNames(
    styles.wrapper,
    { [styles.isUserSubscribed]: isUserSubscribed },
  )}
  >
    <p className={styles.text}>
      {i18nTexts.promoBlock.textSubscribeFinished}
    </p>

    <h1 className={styles.title}>
      <button
        type="button"
        className={styles.button}
      >
        <Icon
          iconName="check"
          className={styles.icon}
        />
      </button>
      {formTitle}
    </h1>

    <p className={styles.subtitle}>
      {formText}
    </p>
    {isUserSubscribed && showVideos && (
      <VideoList
        i18nTexts={i18nTexts}
        videos={videos}
      />
    )}
    {isUserSubscribed && showArticles && (
      <ArticleList
        newsPapers={first3Articles}
        i18nTexts={i18nTexts}
      />
    )}
  </div>
)

PromoBlock.propTypes = {
  i18nTexts: PropTypes.shape({}).isRequired,
  formTitle: PropTypes.string.isRequired,
  formText: PropTypes.string.isRequired,
  videos: PropTypes.arrayOf(PropTypes.shape({
    videoUrl: PropTypes.string.isRequired,
  })).isRequired,
  isUserSubscribed: PropTypes.bool.isRequired,
  first3Articles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  showArticles: PropTypes.bool.isRequired,
  showVideos: PropTypes.bool.isRequired,
}

export default container(PromoBlock)
