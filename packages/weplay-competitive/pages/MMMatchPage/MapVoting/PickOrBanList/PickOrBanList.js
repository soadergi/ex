import React from 'react'
import PropTypes from 'prop-types'

import MMVotePropType from 'weplay-competitive/customPropTypes/MMVotePropType'

import PickOrBanItem from './PickOrBanItem/PickOrBanItem'
import styles from './PickOrBanList.scss'

const PickOrBanList = ({
  // required props
  vote,
  pickOrBanItems,
  // container props
}) => vote.voteItems && (
<div className={styles.list}>
  {vote.voteItems.map(voteItem => (
    <PickOrBanItem
      key={voteItem.id}
      voteItem={voteItem}
      pickOrBanItems={pickOrBanItems}
      vote={vote}
    />
  ))}
</div>
)

PickOrBanList.propTypes = {
  vote: MMVotePropType.isRequired,
  pickOrBanItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      logo: PropTypes.string,
      status: PropTypes.string,
    }),
  ).isRequired,
}

PickOrBanList.defaultProps = {
  // optional props
}

export default PickOrBanList
