import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import container from 'weplay-competitive/components/PaginationFooter/PaginationInput/PageButton/container'

import styles from './styles.scss'


const PageButton = ({
  // required props
  page,
  isActive,

  // container props
  handleClick,

  // optional props
}) => (
  <button
    type="button"
    onClick={handleClick}
    className={classNames(
      styles.item,
      { [styles.active]: isActive },
    )}
    disabled={isActive}
  >
    {String(page)}
  </button>

)

PageButton.propTypes = {
  // required props
  page: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,

  // container props
  handleClick: PropTypes.func.isRequired,

  // optional props
}

PageButton.defaultProps = {
  // optional props
}

export default container(PageButton)
