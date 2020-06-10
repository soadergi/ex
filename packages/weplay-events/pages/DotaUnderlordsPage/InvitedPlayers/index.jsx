import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import container from './container'
import Group from './GroupPlayers'

const InvitedPlayers = ({
  // required props
  tournamentTitle,

  // props from container
  tournamentPlayers,

  // optional props
}) => (
  <Fragment>
    {tournamentPlayers.map(group => (
      <Group
        key={group.name}
        tournamentTitle={tournamentTitle}
        group={group}
      />
    ))}
  </Fragment>
)


InvitedPlayers.propTypes = {
  // required props

  // props from container
  tournamentTitle: PropTypes.string,
  tournamentPlayers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  // optional props
}

InvitedPlayers.defaultProps = {
  // optional props
  tournamentTitle: '',
}


export default container(InvitedPlayers)
