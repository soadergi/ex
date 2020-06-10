import React from 'react'
import PropTypes from 'prop-types'
import memberStatisticPerformancePropType from 'weplay-competitive/customPropTypes/memberStatisticPerformancePropType'
import TableRowTwoColumns from 'weplay-competitive/components/TableRowTwoColumns'
import CollapsibleTable from 'weplay-competitive/components/CollapsibleTable'

import container from './container'

const PerformanceCard = ({
  // required props
  t,
  performances,
  togglePerformance,
  isShowAllPerformance,
  // props from container

  // optional props
}) => (
  <CollapsibleTable
    title={t('competitive.member.overview.performance')}
    clickHandler={togglePerformance}
    isOpen={isShowAllPerformance}
    hasSpoilerTrigger
  >
    {performances.map(performance => (
      <TableRowTwoColumns
        key={performance.id}
        text={performance.text}
        value={performance.value}
      />
    ))}
  </CollapsibleTable>
)

PerformanceCard.propTypes = {
  // required props
  t: PropTypes.func.isRequired,
  performances: PropTypes.arrayOf(memberStatisticPerformancePropType).isRequired,
  // props from container
  togglePerformance: PropTypes.func.isRequired,
  isShowAllPerformance: PropTypes.bool.isRequired,
  // optional props
}

PerformanceCard.defaultProps = {
  // optional props
}

export default container(PerformanceCard)
