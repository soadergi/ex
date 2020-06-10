import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import imgPropType from 'weplay-core/customPropTypes/imgPropType'
import Image from 'weplay-components/Image'

import container from './container'
import styles from './styles.scss'

const SponsorItem = ({
  // required props
  imageUrl,
  name,
  linkUrl,
  // container props
  logSponsorClick,

  // optional props
}) => (
  <li className={styles.block}>
    {linkUrl
      ? (
        <a
          href={linkUrl}
          className={styles.link}
          rel="noreferrer noopener"
          target="_blank"
          onClick={logSponsorClick}
        >
          <Image
            className={classNames(
              styles.image,
              'o-img-responsive',
            )}
            src={imageUrl}
            alt={name}
          />
        </a>
      )
      : (
        <Image
          className={classNames(
            styles.image,
            'o-img-responsive',
          )}
          src={imageUrl}
          alt={name}
        />
      )}
  </li>

)

SponsorItem.propTypes = {
  // required props
  imageUrl: imgPropType.isRequired,
  name: PropTypes.string.isRequired,
  // container props
  logSponsorClick: PropTypes.func.isRequired,

  // optional props
  linkUrl: PropTypes.string,
}

SponsorItem.defaultProps = {
  // optional props
  linkUrl: '',
}

export default container(SponsorItem)
