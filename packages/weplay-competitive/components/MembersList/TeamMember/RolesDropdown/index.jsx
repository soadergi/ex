import React from 'react'
import PropTypes from 'prop-types'
import Select from 'weplay-components/Select'
import { ROLES } from 'weplay-competitive/constants/roles'
import teamMemberPropType from 'weplay-competitive/customPropTypes/teamMemberPropType'

import styles from '../styles.scss'

import container from './container'


// it overrides inline styles of the library
const dropdownStyle = { width: '100%' }

const RolesDropdown = ({
  // required props
  teamMember,
  captainDropdownOptions,
  rolesDropdownOptions,
  coreTeamMembersCount,
  setTeamMemberStatus,
  gameModeSize,

  // container props

  // optional props
}) => (teamMember.role === ROLES.CAPTAIN ? (
  <Select
    value={teamMember.role}
    disabled
    options={captainDropdownOptions}
    style={dropdownStyle}
    className={styles.dropdown}
  />
) : (
  <Select
    value={teamMember.role}
    options={rolesDropdownOptions}
    isDisabled={coreTeamMembersCount >= gameModeSize - 1 && teamMember.role === ROLES.STAND_IN}
    style={dropdownStyle}
    className={styles.dropdown}
    onChange={value => setTeamMemberStatus(value, teamMember)}
  />
))

RolesDropdown.propTypes = {
  // required props
  teamMember: teamMemberPropType.isRequired,
  rolesDropdownOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  captainDropdownOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  coreTeamMembersCount: PropTypes.number.isRequired,
  gameModeSize: PropTypes.number.isRequired,
  setTeamMemberStatus: PropTypes.func.isRequired,

  // container props

  // optional props
}

RolesDropdown.defaultProps = {
  // optional props
}

export default container(RolesDropdown)
