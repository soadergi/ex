import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Breadcrumb from './Breadcrumb'
import container from './container'
import styles from './styles.scss'

const Breadcrumbs = ({
  breadcrumbs,
  className,
  isWhite,
}) => (
  <div className={classNames(
    styles.breadcrumbs,
    className,
  )}
  >
    <ul
      itemScope
      className={styles.list}
      itemType="http://schema.org/BreadcrumbList"
    >
      {breadcrumbs.map((item, index) => (
        <Breadcrumb
          key={item.name}
          item={item}
          itemIndex={index + 1}
          isWhite={isWhite}
        />
      ))}
    </ul>
  </div>
)

Breadcrumbs.propTypes = {
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  isWhite: PropTypes.bool,
  className: PropTypes.string,
}

Breadcrumbs.defaultProps = {
  isWhite: false,
  className: '',
}

export default container(Breadcrumbs)
