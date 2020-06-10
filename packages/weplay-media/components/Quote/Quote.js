import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import UserAvatar from 'weplay-components/UserAvatar'

import styles from './Quote.scss'

const userAvatarResponsive = {
  sm: '96',
}

const Quote = ({
  // required props
  quote,
  // container props
}) => (
  <div className={styles.block}>
    <div className={styles.border}>
      <span className={styles.separator}>«</span>
    </div>
    <div className={classNames(
      styles.content,
      { [styles.hasAuthor]: quote.authorName },
    )}
    >
      {quote.authorName && (
        <div className={styles.author}>
          {quote.authorAvatarUrl && (
            <UserAvatar
              avatar={quote.authorAvatarUrl}
              className={styles.avatar}
              size="64"
              responsive={userAvatarResponsive}
              shape="square"
            />
          )}
          <div>
            <p className={styles.name}>{quote.authorName}</p>
            <p className={styles.info}>{quote.authorDescription}</p>
          </div>
        </div>
      )}
      <p className={styles.text}>
        {quote.body}
      </p>
    </div>
    <div className={styles.border}>
      <span className={styles.separator}>»</span>
    </div>
  </div>

)

Quote.propTypes = {
  // required props
  quote: PropTypes.shape({
    body: PropTypes.string.isRequired,
    authorName: PropTypes.string,
    authorAvatarUrl: PropTypes.string,
    authorDescription: PropTypes.string,
  }).isRequired,
  // container props
}

export default React.memo(Quote)
