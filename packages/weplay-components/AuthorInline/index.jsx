import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { getWriterUrl } from 'weplay-core/helpers/getWriterUrl'
import { getWriterTitle } from 'weplay-core/reduxs/helpers'

import UserAvatar from 'weplay-components/UserAvatar'
import Link from 'weplay-components/Link'
import Skeleton from 'weplay-components/Skeleton'

import styles from './styles.scss'

const AuthorInline = ({
  modification,
  newspaperWriter,
  color,
}) => {
  const title = useMemo(() => getWriterTitle(newspaperWriter) ?? '', [newspaperWriter])
  const isColumnist = useMemo(() => newspaperWriter.authorType === 'columnist', [newspaperWriter.authorType])
  const authorLink = useMemo(
    () => `/${isColumnist ? 'columnists' : 'authors'}/${getWriterUrl(title, newspaperWriter.authorId)}`,
    [isColumnist, title, newspaperWriter.authorId],
  )

  return (
    <div className={classNames(
      styles.author,
      { [styles.authorColumnist]: isColumnist },
      modification.map(item => styles[item]),
    )}
    >
      <UserAvatar
        avatar={newspaperWriter.avatar?.path}
        className={styles.authorAvatar}
      />
      <Link
        className={classNames(
          styles.authorName,
          styles[color],
        )}
        to={authorLink}
      >
        <span>{title || <Skeleton size="short" />}</span>
      </Link>
    </div>
  )
}

AuthorInline.propTypes = {
  modification: PropTypes.arrayOf(PropTypes.string),
  newspaperWriter: PropTypes.shape({
    authorType: PropTypes.string,
    authorId: PropTypes.number,
    avatar: PropTypes.shape({
      path: PropTypes.string,
    }),
  }),
  color: PropTypes.string,
}

AuthorInline.defaultProps = {
  modification: [],
  newspaperWriter: {},
  color: '',
}

export default React.memo(AuthorInline)
