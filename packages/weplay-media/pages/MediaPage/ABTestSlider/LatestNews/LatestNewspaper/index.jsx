import React from 'react'
import PropTypes from 'prop-types'
import { transformUrl } from 'weplay-core/helpers/transformUrl'
import Link from 'weplay-components/Link'
import LocalizedMoment from 'weplay-components/LocalizedMoment'
import UserAvatar from 'weplay-components/UserAvatar'

import styles from './styles.scss'
import container from './container'

const LatestNewspaper = ({
  // required props
  newspaper,
  onClick,
  // container props
  title,
  // props from container
  previewImage,
}) => (
  <li className={styles.item}>
    <Link
      to={`/news/${transformUrl(newspaper)}`}
      onClick={onClick}
      className={styles.preview}
    >
      <UserAvatar
        avatar={previewImage.url}
        alt={previewImage.alt}
        shape="square"
        size="48"
      />
    </Link>

    <Link
      className={styles.itemText}
      to={`/news/${transformUrl(newspaper)}`}
      onClick={onClick}
    >
      {title}
    </Link>
    <time
      className={styles.time}
      dateTime={newspaper.publishedDate}
    >
      <LocalizedMoment
        fromNow
        dateTime={newspaper.publishedDate}
      />
    </time>
  </li>
)

LatestNewspaper.propTypes = {
  newspaper: PropTypes.shape({
    published_date: PropTypes.string,
    imageAlt: PropTypes.string,
    publishedDate: PropTypes.string,
  }).isRequired,
  previewImage: PropTypes.shape({
    url: PropTypes.string,
    alt: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default container(LatestNewspaper)
