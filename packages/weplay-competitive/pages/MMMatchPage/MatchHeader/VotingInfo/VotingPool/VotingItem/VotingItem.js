import React from 'react'
import PropTypes from 'prop-types'

import Label from 'weplay-components/Label'

import styles from './VotingItem.scss'

// TODO: @Kislyi add ban color plz
const labelModificationMagenta = 'magenta'
const labelModificationSuccess = 'success'

const VotingItem = ({
  // required props

  // container props
  voteItem,
  // optional props
}) => (
  <Label
    color={voteItem.status === 'BAN' ? labelModificationMagenta : labelModificationSuccess}
    className={styles.label}
  >
    {voteItem?.name ?? ''}
  </Label>
)

VotingItem.propTypes = {
  // required props

  // container props
  voteItem: PropTypes.shape({
    name: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  // optional props
}

VotingItem.defaultProps = {
  // optional props
}

export default React.memo(VotingItem)
