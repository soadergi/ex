import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import coverImg from 'weplay-core/img/cover.png'
import { transformUrl } from 'weplay-core/helpers/transformUrl'
import hexToGradient from 'weplay-core/helpers/hexToGradient'

import Link from 'weplay-components/Link'
import Tags from 'weplay-components/Tags'
import SpecialLabel from 'weplay-components/SpecialLabel'
import Image from 'weplay-components/Image'

import specialTagPropType from 'weplay-media/customPropTypes/specialTagPropType'

import container from './container'
import styles from './styles.scss'

const SpecialTagCard = ({
  specialTag,
  i18nTexts,
}) => {
  const hasImage = Boolean(specialTag.bgImage)

  return (
    <div
      className={classNames(
        styles.articleItem,
        styles.inline,
      )}
    >
      <figure
        className={classNames(
          styles.figure,
          styles.figureSpecialImage,
          !hasImage && styles.figureSpecialColor,
        )}
        style={{
          background: hexToGradient(specialTag.bgColor),
        }}
      >
        <Link
          to={`/special-tags/${transformUrl(specialTag)}`}
          className={styles.imageLink}
        >
          {hasImage && (
            <Image
              {...specialTag.bgImage.attributes}
              alt={specialTag.bgImage.attributes.alt}
              src={specialTag.bgImage.path || coverImg}
              className={styles.image}
            />
          )}
          <div className={styles.stickerBlock}>
            <Image
              {...specialTag.avatar.attributes}
              alt={specialTag.avatar.attributes.alt}
              className="o-img-responsive"
              src={specialTag.avatar.path}
            />
          </div>
        </Link>

        <div className={styles.articleBlock}>
          <SpecialLabel />
          <div className={styles.article}>
            <span className="u-text-medium">
              {specialTag.counters.news}
              {' '}
            </span>
            <span className="u-text-medium">
              {i18nTexts.article.articles}
            </span>
          </div>
        </div>
      </figure>

      <div
        className={classNames(
          styles.container,
        )}
      >
        <div className={styles.content}>
          <div className="u-mb-1">
            {specialTag.tags && (
              <Tags
                specialTagTranslateId={specialTag.specialTagTranslateId}
              />
            )}
          </div>

          <Link
            to={`/special-tags/${transformUrl(specialTag)}`}
            className={styles.contentLink}
          >
            <p className={styles.title}>
              {specialTag.name}
            </p>
            <p className={styles.text}>
              {specialTag.shortDescription}
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}

SpecialTagCard.propTypes = {
  specialTag: specialTagPropType.isRequired,
  i18nTexts: PropTypes.shape({}).isRequired,
}

export default container(SpecialTagCard)
