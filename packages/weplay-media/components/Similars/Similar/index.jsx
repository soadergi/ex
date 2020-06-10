import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'weplay-components/Skeleton'
import articleImagePropType from 'weplay-core/customPropTypes/articleImagePropType'
import Link from 'weplay-components/Link'
import UserAvatar from 'weplay-components/UserAvatar'
import newspaperPropType from 'weplay-core/customPropTypes/newsPaperPropType'

import styles from './styles.scss'
import container from './container'

const Similar = ({
  // required props
  // container props
  newspaper,
  squareImage,
  linkUrl,
  // optional props
  handleClick,
}) => (
  <div className={styles.item}>
    <Link
      to={linkUrl}
      className={styles.link}
      onClick={handleClick}
    >
      <UserAvatar
        avatar={squareImage.url}
        shape="square"
        className={styles.preview}
        size="64"
      />
      <span className={styles.text}>{newspaper.title || <Skeleton count={2} />}</span>
    </Link>
  </div>
)

Similar.propTypes = {
  // required props
  squareImage: articleImagePropType.isRequired,
  // container props
  linkUrl: PropTypes.string.isRequired,
  // optional props
  newspaper: newspaperPropType,
  handleClick: PropTypes.func,
}

Similar.defaultProps = {
  newspaper: {},
  handleClick: R.always,
}

export default container(Similar)
