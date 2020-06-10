import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.scss'
import container from './container'
import TableRow from './TableRow'

const Table = ({
  // required props
  promocodesList,

  // container props
  i18nTexts,

  // optional props
}) => (
  <div className={styles.tableWrap}>
    <table className={styles.table}>
      <tbody>
        <tr className={styles.tr}>
          <td className={styles.td}>{i18nTexts.cabinet.promoTableTitle}</td>
          <td className={styles.td}>{i18nTexts.cabinet.promoTableSubTitle}</td>
          <td className={styles.td} />
        </tr>

        {promocodesList.map(promocode => (
          <TableRow
            key={promocode.id}
            promocode={promocode}
          />
        ))}
      </tbody>
    </table>
  </div>
)

Table.propTypes = {
  // required props
  promocodesList: PropTypes.arrayOf(PropTypes.shape({
    activated_date: PropTypes.string,
    id: PropTypes.number,
    promocode: PropTypes.string,
    promocode_id: PropTypes.number,
    status: PropTypes.string,
    user_id: PropTypes.number,
  })).isRequired,

  // container props
  i18nTexts: PropTypes.shape({}).isRequired,
}

export default container(Table)
