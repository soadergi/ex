import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Skeleton from 'weplay-components/Skeleton'
import UserAvatar from 'weplay-components/UserAvatar'
import { getWriterUrl } from 'weplay-core/helpers/getWriterUrl'
import Link from 'weplay-components/Link'
import { getWriterTitle } from 'weplay-core/reduxs/helpers'
import newspaperWriterPropType from 'weplay-media/customPropTypes/newspaperWriterPropType'

import styles from './styles.scss'

const AuthorTile = ({
  newspaperWriter,
  className,
  isWhite,
}) => {
  const newspaperWriterTitle = useMemo(() => getWriterTitle(newspaperWriter), [newspaperWriter])
  const authorLink = useMemo(() => {
    const writerUrl = getWriterUrl(newspaperWriterTitle, newspaperWriter.authorId)
    return `/${newspaperWriter.authorType === 'columnist' ? 'columnists' : 'authors'}/${writerUrl}`
  })

  return (
    <div className={classNames(
      styles.block,
      { [styles.white]: isWhite },
      className,
    )}
    >
      <UserAvatar
        avatar={newspaperWriter.avatar?.path}
        className={styles.avatar}
        size="40"
        shape="square"
      />
      <div className={styles.textWrap}>
        <Link
          className={styles.name}
          to={authorLink}
        >
          <span>
            {newspaperWriterTitle || <Skeleton width="200px" />}
          </span>
        </Link>
      </div>

    </div>
  )
}

AuthorTile.propTypes = {
  newspaperWriter: newspaperWriterPropType.isRequired,
  className: PropTypes.string,
  isWhite: PropTypes.bool,
}

AuthorTile.defaultProps = {
  className: '',
  isWhite: false,
}

export default React.memo(AuthorTile)
