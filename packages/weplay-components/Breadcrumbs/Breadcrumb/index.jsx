import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Link from 'weplay-components/Link'
import Skeleton from 'weplay-components/Skeleton'

import container from './container'
import styles from './styles.scss'

const Breadcrumb = ({
  item: {
    path,
    name,
  },
  itemIndex,
  isWhite,
}) => (
  <li
    itemScope
    className={classNames(
      styles.item,
      { [styles.isWhite]: isWhite },
    )}
    itemProp="itemListElement"
    itemType="http://schema.org/ListItem"
  >
    <meta
      itemProp="position"
      content={itemIndex}
    />
    <Link
      to={path}
      className={styles.link}
      itemProp="item"
    >
      <span itemProp="name">{name || <Skeleton size="short" />}</span>
    </Link>
  </li>
)

Breadcrumb.propTypes = {
  item: PropTypes.shape({
    path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  itemIndex: PropTypes.number.isRequired,
  isWhite: PropTypes.bool,
}

Breadcrumb.defaultProps = {
  isWhite: false,
}

export default container(Breadcrumb)
