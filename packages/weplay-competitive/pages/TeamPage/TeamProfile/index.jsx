import React from 'react'
import PropTypes from 'prop-types'
import imgPropType from 'weplay-core/customPropTypes/imgPropType'
import Profile, { PROFILE_MODS } from 'weplay-competitive/components/Profile'
import teamPropType from 'weplay-competitive/customPropTypes/teamPropType'
import container from 'weplay-competitive/pages/TeamPage/TeamProfile/container'

const teamProfileModifications = [PROFILE_MODS.HIDE_DATE, PROFILE_MODS.HIDE_STEAM]

const TeamProfile = ({
  // required props
  team,
  isOwner,
  discipline,
  // container props
  handleFileUpload,
  handleClickEdit,
  background,
  // optional props
}) => (
  <Profile
    record={team}
    backgroundImage={background}
    isOwner={isOwner}
    handleFileUpload={handleFileUpload}
    handleClickEdit={handleClickEdit}
    modifications={teamProfileModifications}
    isTitleH1
    discipline={discipline}
  />
)

TeamProfile.propTypes = {
  // required props
  team: teamPropType.isRequired,
  isOwner: PropTypes.bool.isRequired,
  discipline: PropTypes.string.isRequired,
  // container props
  handleFileUpload: PropTypes.func.isRequired,
  handleClickEdit: PropTypes.func.isRequired,
  background: imgPropType.isRequired,
  // optional props
}

TeamProfile.defaultProps = {
  // optional props
}

export default container(TeamProfile)
