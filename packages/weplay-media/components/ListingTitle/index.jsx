import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from 'weplay-components/Icon'
import Skeleton from 'weplay-components/Skeleton'

import styles from './styles.scss'

const ListingTitle = ({
  title,
  handleClick,
  className,
  modifier,
}) => (
  <div className={classNames(
    styles.block,
    className,
    { [styles[modifier]]: modifier },
  )}
  >
    <ul className={styles.list}>
      <li className={styles.item}>
        <div className={styles.wrapper}>
          <button
            className={styles.close}
            type="button"
            onClick={handleClick}
          >
            <Icon
              iconName="close"
              className={styles.icon}
            />
          </button>

          <h1 className={styles.title}>
            {title || <Skeleton size="medium" />}
          </h1>
        </div>
      </li>
    </ul>
  </div>
)

ListingTitle.propTypes = {
  handleClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  modifier: PropTypes.string,
}

ListingTitle.defaultProps = {
  modifier: '',
  className: '',
}

export default React.memo(ListingTitle)
