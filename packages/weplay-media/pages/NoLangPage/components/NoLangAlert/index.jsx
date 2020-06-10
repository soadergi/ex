import React, { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Image from 'weplay-components/Image'
import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'
import getFlagURLByCountryCode from 'weplay-core/helpers/getFlagURLByCountryCode'
import { getPrefix } from 'weplay-core/routes/_helpers'
import MessageBlock from 'weplay-media/components/MessageBlock'

import container from './container'
import styles from './styles.scss'

class NoLangAlert extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isClosed: false,
    }
  }

  render() {
    if (this.state.isClosed) return ('')
    const {
      articleTitleAnotherLang,
      titleBefore,
      titleAfter,
      currentLanguage,
      text,
      link,
      itemId,
      showFlagBlock,
      logReadArticleClick,
      nextSpecialTagLanguage,
      toNextArticle,
      className,
      specialTagAnotherLang,
    } = this.props
    // TODO: change to general solution

    const url = getFlagURLByCountryCode(specialTagAnotherLang)

    return (
      <div className={classNames(className)}>
        <p className={styles.descriptionText}>
          {titleBefore}
          <span className="u-text-bold">
            {articleTitleAnotherLang && `"${articleTitleAnotherLang}"`}
          </span>
          {' '}
          {titleAfter}
        </p>
        <MessageBlock
          image={(
            <Image
              src={url}
              alt={currentLanguage}
              className={styles.icon}
            />
          )}
          text={messageLinkClassName => (
            <>
              {text}
              {' '}
              {showFlagBlock
                ? (
                  <RouterLink
                    className={messageLinkClassName}
                    to={toNextArticle}
                    onClick={logReadArticleClick}
                  >
                    {link}
                  </RouterLink>
                ) : (
                  <RouterLink
                    className={messageLinkClassName}
                    to={`${getPrefix(nextSpecialTagLanguage)}${pathWithParamsByRoute(
                      NAMES.SPECIAL_TAG,
                      { specialTagId: itemId },
                    )}`}
                    onClick={logReadArticleClick}
                  >
                    {link}
                  </RouterLink>
                )}
            </>
          )}
        />
      </div>
    )
  }
}

NoLangAlert.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  link: PropTypes.string.isRequired,
  titleBefore: PropTypes.string.isRequired,
  titleAfter: PropTypes.string.isRequired,
  i18nTexts: PropTypes.shape({}).isRequired,
  currentLanguage: PropTypes.string.isRequired,
  articleTitleAnotherLang: PropTypes.string,
  itemId: PropTypes.string.isRequired,
  toNextArticle: PropTypes.string.isRequired,
  specialTagAnotherLang: PropTypes.string.isRequired,
  nextSpecialTagLanguage: PropTypes.string.isRequired,
  showFlagBlock: PropTypes.bool.isRequired,
  logReadArticleClick: PropTypes.func.isRequired,
}

NoLangAlert.defaultProps = {
  className: '',
  articleTitleAnotherLang: '',
}

export default container(NoLangAlert)
