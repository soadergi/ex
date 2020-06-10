import * as R from 'ramda'
import {
  compose, withHandlers, withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

const NUMBER_OF_ITEMS = 3

const container = compose(
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
  }),
  withPropsOnChange([
    'offset',
    'limit',
    'total',
  ], ({
    offset,
    limit,
    total,
  }) => {
    const totalPages = Math.ceil(total / limit)
    const currentPage = Math.floor(offset / limit) + 1
    const isFirstPage = currentPage === 1
    const isLastPage = offset + limit >= total
    const firstPageFromRow = Math.max(currentPage - 1, 1)
    return ({
      isFirstPage,
      isLastPage,
      pages: R.pipe(
        R.range(firstPageFromRow),
        R.slice(0, NUMBER_OF_ITEMS),
      )(totalPages + 1),
      currentPage,
    })
  }),
  withHandlers({
    handleClickFirstPage: ({
      onChange,
    }) => () => onChange(0),

    handleClickPrevPage: ({
      onChange,
      offset,
      limit,
    }) => () => onChange(offset - limit),

    handleClickPage: ({
      limit,
      onChange,
    }) => (page) => {
      onChange((page - 1) * limit)
    },

    handleClickNextPage: ({
      onChange,
      offset,
      limit,
    }) => () => onChange(offset + limit),

    handleClickLastPage: ({
      onChange,
      limit,
      total,
    }) => () => {
      const totalPages = Math.ceil(total / limit)
      return onChange((totalPages - 1) * limit)
    },

  }),
)

export default container
