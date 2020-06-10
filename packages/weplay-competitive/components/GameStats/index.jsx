import React from 'react'
import PropTypes from 'prop-types'
import memberStatisticGameStatsPropType from 'weplay-competitive/customPropTypes/memberStatisticGameStatsPropType'
import TableRowTwoColumns from 'weplay-competitive/components/TableRowTwoColumns'

import container from './container'
import styles from './styles.scss'


const GameStats = ({
  // required props

  // props from container
  indicators,

  // optional props
  children,
}) => indicators && (
  <div className={styles.block}>
    {indicators.map(indicator => (
      <TableRowTwoColumns
        key={indicator.id}
        icon={indicator.icon}
        text={indicator.title}
        value={indicator.value}
      />
    ))}
    {children}
  </div>
)

GameStats.propTypes = {
  // required props
  indicators: PropTypes.arrayOf(memberStatisticGameStatsPropType).isRequired,
  // props from container

  // optional props
  children: PropTypes.node,
}

GameStats.defaultProps = {
  // optional props
  children: null,
}

export default container(GameStats)
