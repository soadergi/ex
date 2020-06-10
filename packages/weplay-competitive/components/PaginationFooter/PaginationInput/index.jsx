import React from 'react'
import PropTypes from 'prop-types'
import SvgIcon from 'weplay-components/SvgIcon'
import classNames from 'classnames'
import container from 'weplay-competitive/components/PaginationFooter/PaginationInput/container'
import PageButton from 'weplay-competitive/components/PaginationFooter/PaginationInput/PageButton'

import styles from './styles.scss'

const PaginationInput = ({
  // required props

  // container props
  pages,
  handleClickFirstPage,
  handleClickPrevPage,
  handleClickPage,
  handleClickNextPage,
  handleClickLastPage,

  isFirstPage,
  currentPage,
  isLastPage,
  // optional props
}) => (
  <div className={styles.pagination}>

    <button
      className={styles.item}
      type="button"
      onClick={handleClickFirstPage}
      disabled={isFirstPage}
    >
      <SvgIcon
        className={classNames(
          styles.invert,
          styles.arrow,
          styles.boubleArrow,
        )}
        iconName="doubleArrow"
      />
    </button>
    <button
      className={styles.item}
      type="button"
      onClick={handleClickPrevPage}
      disabled={isFirstPage}
    >
      <SvgIcon
        className={classNames(
          styles.invert,
          styles.arrow,
        )}
        iconName="next"
      />
    </button>
    {pages.map(page => (
      <PageButton
        key={page}
        isActive={page === currentPage}
        page={page}
        onClick={handleClickPage}
      />
    ))}
    <button
      className={styles.item}
      type="button"
      onClick={handleClickNextPage}
      disabled={isLastPage}
    >
      <SvgIcon
        className={styles.arrow}
        iconName="next"
      />
    </button>
    <button
      className={styles.item}
      type="button"
      onClick={handleClickLastPage}
      disabled={isLastPage}
    >
      <SvgIcon
        className={classNames(
          styles.boubleArrow,
          styles.arrow,
        )}
        iconName="doubleArrow"
      />
    </button>

  </div>
)

PaginationInput.propTypes = {
  // required props

  // container props
  pages: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleClickFirstPage: PropTypes.func.isRequired,
  handleClickPrevPage: PropTypes.func.isRequired,
  handleClickPage: PropTypes.func.isRequired,
  handleClickNextPage: PropTypes.func.isRequired,
  handleClickLastPage: PropTypes.func.isRequired,

  isFirstPage: PropTypes.bool.isRequired,
  currentPage: PropTypes.number.isRequired,
  isLastPage: PropTypes.bool.isRequired,

  // optional props
}

PaginationInput.defaultProps = {
  // optional props
}

export default container(PaginationInput)
