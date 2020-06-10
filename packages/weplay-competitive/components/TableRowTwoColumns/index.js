import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import withMoment from 'weplay-core/HOCs/withMoment'
import { useFormatDatetime } from 'weplay-core/hooks/useFormatDatetime'

import Icon from 'weplay-components/Icon'

import styles from './styles.scss'

const TableRowTwoColumns = ({
  // required props

  // optional props
  value,
  icon,
  iconClassName,
  text,
  children,

  // props from HOCs
  moment,
}) => {
  const formatDatetime = useFormatDatetime()
  return (
    <div className={styles.tr}>
      <div className={styles.cell}>
        <span className={styles.text}>
          {icon && (
          <Icon
            iconName={icon}
            className={classNames(
              iconClassName,
              styles.icon,
            )}
          />
          )}
          {text}
        </span>
      </div>
      <div className={styles.cell}>
        <span className={styles.value}>
          {moment(value, moment.ISO_8601, true).isValid()
            ? formatDatetime(value, { formatKey: 'withTime' })
            : value}
        </span>
        {children}
      </div>
    </div>
  )
}

TableRowTwoColumns.propTypes = {
  // required props

  // optional props
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.string,
  iconClassName: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.node,

  // props from HOCs
  moment: PropTypes.func.isRequired,
}

TableRowTwoColumns.defaultProps = {
  // optional props
  value: '',
  icon: '',
  iconClassName: '',
  text: '',
  children: null,
}

export default withMoment(TableRowTwoColumns)
