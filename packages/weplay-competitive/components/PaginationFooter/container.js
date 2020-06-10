import {
  compose, withHandlers, withProps, withPropsOnChange,
} from 'recompose'
import * as R from 'ramda'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

// eslint-disable-next-line no-magic-numbers
const LIMIT_OPTIONS = [10, 25, 50, 100]

const container = compose(
  withLocale,
  withPropsOnChange([
    'pathToItemName',
    'pagination',
    't',
  ], ({
    itemName,
    pagination: {
      offset,
      limit,
      total,
    },
    t,
  }) => ({
    counterText: t(
      'competitive.pagination.main',
      {
        firstItem: offset + 1,
        lastItem: R.min(offset + limit, total),
        totalItems: total,
        itemName,
      },
    ),
  })),
  withProps({
    limitOptions: LIMIT_OPTIONS.map(limitOption => ({
      label: String(limitOption),
      value: limitOption,
    })),
  }),
  withHandlers({
    handleChangeLimit: ({
      onPaginationChange,
      pagination,
    }) => value => onPaginationChange({
      ...pagination,
      limit: value,
      offset: 0,
    }),
    handleOffsetChange: ({
      onPaginationChange,
      pagination,
    }) => offset => onPaginationChange({
      ...pagination,
      offset,
    }),
  }),
)

export default container
