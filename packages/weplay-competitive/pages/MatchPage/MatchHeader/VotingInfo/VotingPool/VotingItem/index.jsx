import React from 'react'
import lobbyMapPropType from 'weplay-competitive/customPropTypes/lobbyMapPropType'
import voteItemPropType from 'weplay-competitive/customPropTypes/voteItemPropType'
import Label from 'weplay-components/Label'

import container from './container'

const labelModificationMagenta = 'magenta'
const labelModificationSuccess = 'success'

const VotingItem = ({
  // required props

  // container props
  voteItem,
  lobbyMap,
  // optional props
}) => (
  <Label color={lobbyMap.vote === 'DROP' ? labelModificationMagenta : labelModificationSuccess}>
    {voteItem.name}
  </Label>
)

VotingItem.propTypes = {
  // required props

  // container props
  voteItem: voteItemPropType.isRequired,
  lobbyMap: lobbyMapPropType.isRequired,
  // optional props
}

VotingItem.defaultProps = {
  // optional props
}

export default container(VotingItem)
