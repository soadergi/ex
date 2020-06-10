import React from 'react'
import PropTypes from 'prop-types'
import Link from 'weplay-components/Link'
import classNames from 'classnames'
import Image from 'weplay-components/Image'

import csBanner from './img/cs-banner.jpg'
import styles from './styles.scss'
import container from './container'

const TournamentBanner = ({
  // required props
  linkText,
  linkUrl,
  title,
  subTitle,
  text,
  handleClick,

  // container props
  isDirePage,

  // optional props
}) => (
  <div
    className={classNames(
      styles.banner,
      { [styles.direPage]: isDirePage },
    )}
  >
    <div
      className={classNames(
        styles.container,
      )}
    >
      <div className={styles.imageContainer}>
        <Image
          className={classNames(
            styles.image,
          )}
          src={csBanner}
          alt=""
        />
      </div>
      <div
        className={classNames(
          styles.content,
        )}
      >
        <h2
          className={classNames(
            styles.title,
          )}
        >
          <span className={styles.titleWePlay}>
            {subTitle}
          </span>
          {title}
        </h2>

        <p className={styles.text}>{text}</p>

        <Link
          to={linkUrl}
          className={styles.link}
          onClick={handleClick}
          target="_blank"
        >
          <span className={styles.text}>{linkText}</span>
        </Link>
      </div>
    </div>
  </div>
)

TournamentBanner.propTypes = {
  // required props
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,

  // container props
  subTitle: PropTypes.string,
  isDirePage: PropTypes.bool,

  // optional props
}

TournamentBanner.defaultProps = {
  // container props
  subTitle: '',
  isDirePage: false,
  // optional props
}

export default container(TournamentBanner)
