import React from 'react'
import PropTypes from 'prop-types'
import paginationPropType from 'weplay-core/customPropTypes/paginationPropType'
import Select from 'weplay-components/Select'
import CountIndicator from 'weplay-competitive/components/CountIndicator'
import container from 'weplay-competitive/components/PaginationFooter/container'
import PaginationInput from 'weplay-competitive/components/PaginationFooter/PaginationInput'

import styles from './styles.scss'

const PaginationFooter = ({
  // required props
  pagination: {
    offset,
    limit,
    total,
  },
  counterText,
  hideLimit,

  // container props
  limitOptions,
  handleChangeLimit,
  handleOffsetChange,

  // optional props
}) => (
  <div className={styles.grid}>
    {total > limit && (
      <PaginationInput
        limit={limit}
        offset={offset}
        total={total}
        onChange={handleOffsetChange}
      />
    )}
    <div className={styles.bottom}>
      <CountIndicator
        className={styles.indicator}
      >
        { counterText }
      </CountIndicator>
      {!hideLimit && (
        <div>
          <Select
            value={Number(limit)}
            options={limitOptions}
            onChange={handleChangeLimit}
          />
        </div>
      )}
    </div>
  </div>
)

PaginationFooter.propTypes = {
  // required props
  pagination: paginationPropType.isRequired,

  // container props
  limitOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  })).isRequired,
  handleChangeLimit: PropTypes.func.isRequired,
  handleOffsetChange: PropTypes.func.isRequired,

  // optional props
  counterText: PropTypes.string.isRequired,
  hideLimit: PropTypes.bool,
}

PaginationFooter.defaultProps = {
  // optional props
  hideLimit: false,
}

export default container(PaginationFooter)
