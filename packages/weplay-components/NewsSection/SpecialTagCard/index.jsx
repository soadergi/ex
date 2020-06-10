import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import articleImagePropType from 'weplay-core/customPropTypes/articleImagePropType'
import i18nTextsPropType from 'weplay-core/customPropTypes/i18nTextsPropType'
import tagPropType from 'weplay-core/customPropTypes/tagPropType'
import Link from 'weplay-components/Link'
import Image from 'weplay-components/Image'
import HashTags from 'weplay-components/HashTags'

import styles from '../NewsCard/styles.scss'

import container from './container'

export const SpecialTagCardMarkup = ({
  // required props
  // container props
  i18nTexts,
  title,
  url,
  image,
  tags,
  newsCounter,
  description,
}) => (
  <div className={classNames(
    styles.block,
    styles.specialCard,
  )}
  >
    <div className={styles.specialProject}>
      <span className={styles.label}>{i18nTexts.article.specialProject}</span>
      <span className={styles.counter}>{newsCounter}</span>
    </div>
    <div className={styles.imgBlock}>
      <Image
        src={image.url}
        alt={image.alt}
        className={styles.image}
      />
    </div>
    <div className={styles.container}>
      <HashTags
        tags={tags}
      />
      <Link
        to={url}
        className={classNames(
          'c-h3',
          styles.title,
        )}
      >
        {title}
      </Link>
      <p className={styles.description}>{description}</p>
    </div>
  </div>
)

SpecialTagCardMarkup.propTypes = {
  // required props
  // container props
  i18nTexts: i18nTextsPropType.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  image: articleImagePropType.isRequired,
  tags: PropTypes.arrayOf(tagPropType).isRequired,
  newsCounter: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default container(SpecialTagCardMarkup)
