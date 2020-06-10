import React from 'react'
import PropTypes from 'prop-types'
import LocalizedMoment from 'weplay-components/LocalizedMoment'

import styles from '../styles.scss'

import container from './container'

const TableRow = ({
  // required props
  promocode,

  // container props
  codeStatus,

  // optional props
}) => (
  <tr className={styles.tr}>
    <td className={styles.td}>{promocode.promocode}</td>

    <td className={styles.td}>
      <span>{codeStatus}</span>
    </td>

    <td className={styles.td}>
      <LocalizedMoment
        dateTime={promocode.activated_date}
        formatKey="withTime"
      />
    </td>
  </tr>
)

TableRow.propTypes = {
  // required props
  promocode: PropTypes.shape({
    activated_date: PropTypes.string,
    id: PropTypes.number,
    promocode: PropTypes.string,
    promocode_id: PropTypes.number,
    status: PropTypes.string,
    user_id: PropTypes.number,
  }).isRequired,

  // container props
  codeStatus: PropTypes.string.isRequired,
}

export default container(TableRow)
