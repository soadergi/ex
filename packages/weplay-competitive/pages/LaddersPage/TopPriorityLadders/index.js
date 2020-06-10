import React from 'react'
import PropTypes from 'prop-types'

import LadderCard from 'weplay-competitive/components/LadderListing/LadderCard'
import ladderPropType from 'weplay-competitive/customPropTypes/ladderPropType'

import styles from './styles.scss'

const TopPriorityLadders = ({
  topPriorityLadders,
}) => (
  <table className={styles.block}>
    <tbody className={styles.grid}>
      {topPriorityLadders.map(ladder => ladder.isFetched && (
      <LadderCard
        key={ladder.id}
        ladder={ladder}
        modifier="topPriority"
      />
      ))}
    </tbody>
  </table>
)

TopPriorityLadders.propTypes = {
  // required props
  topPriorityLadders: PropTypes.arrayOf(ladderPropType).isRequired,
}

TopPriorityLadders.defaultProps = {
  // optional props
}

export default TopPriorityLadders
