import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import newspaperPropType from 'weplay-core/customPropTypes/newsPaperPropType'
import getArticleImage from 'weplay-core/helpers/getArticleImage'
import { transformUrl } from 'weplay-core/helpers/transformUrl'

import ColumnistInfo from 'weplay-components/ColumnistInfo'
import Link from 'weplay-components/Link'

import styles from './ShortNewsCard.scss'

const ShortNewsCard = ({
  // required props
  newspaper,
  handleCardClick,
  // container props
  // image,
  // optional props
}) => {
  const image = useMemo(() => getArticleImage(newspaper, 'standard'), [newspaper])
  return (
    <div
      className={styles.block}
    >
      <Link
        to={`/news/${transformUrl(newspaper)}`}
        className={styles.imgLink}
        onClick={handleCardClick}
      >
        <img
          className="o-img-responsive"
          src={image.url}
          alt={image.alt}
        />
      </Link>
      <div className={styles.content}>
        <Link
          to={`/news/${transformUrl(newspaper)}`}
          className={styles.title}
          onClick={handleCardClick}
        >
          {newspaper.title}
        </Link>
        <ColumnistInfo
          columnist={newspaper.columnist}
        />
      </div>
    </div>
  )
}

ShortNewsCard.propTypes = {
  // required props
  newspaper: newspaperPropType.isRequired,
  handleCardClick: PropTypes.func.isRequired,
  // container props
  // optional props
}

ShortNewsCard.defaultProps = {
  // optional props
}

export default React.memo(ShortNewsCard)
