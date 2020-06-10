import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.scss'
import container from './container'

const DotaUnderlordsGroupTableHead = ({
  // required props

  // container props
  tableHeaders,
  i18nTexts,

  // optional props
}) => (
  <thead>
    <tr>
      <th className={styles.cell}>
        <span className={styles.tHeadSubtitle}>{i18nTexts.tournamentStages.dotaUnderlords.gameTitle}</span>
      </th>
      {tableHeaders.map(tableHeader => (
        <th
          key={tableHeader.id}
          className={styles.cell}
        >
          <span className={styles.tHeadSubtitle}>{tableHeader.label}</span>
        </th>
      ))}

      <th className={styles.cell}>
        <span className={classNames(
          styles.tHeadSubtitle,
          styles.total,
        )}
        >
          {i18nTexts.tournamentStages.dotaUnderlords.total}
        </span>
      </th>
    </tr>
  </thead>
)

DotaUnderlordsGroupTableHead.propTypes = {
  // required props

  // container props
  tableHeaders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  i18nTexts: PropTypes.shape({}).isRequired,

  // optional props
}

DotaUnderlordsGroupTableHead.defaultProps = {
  // optional props
}

export default container(DotaUnderlordsGroupTableHead)
