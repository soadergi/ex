import React from 'react'
import PropTypes from 'prop-types'

import imgPropType from 'weplay-core/customPropTypes/imgPropType'

import useDiscipline from 'weplay-competitive/hooks/useDiscipline'
import Profile from 'weplay-competitive/components/Profile'
import memberPropType from 'weplay-competitive/customPropTypes/memberPropType'
import container from 'weplay-competitive/pages/MemberPage/MemberProfile/container'

const MemberProfile = ({
  // required props
  member,
  isOwner,
  toggleConnectSteamModal,
  // container props
  handleFileUpload,
  handleClickEdit,
  background,
  // optional props
}) => {
  // TODO: @rbogdanov move discipline from MemberProfile to Profile
  const { discipline } = useDiscipline()
  return (
    <Profile
      record={member}
      backgroundImage={background}
      isOwner={isOwner}
      handleFileUpload={handleFileUpload}
      handleClickEdit={handleClickEdit}
      toggleConnectSteamModal={toggleConnectSteamModal}
      isGameRouter
      isTitleH1
      discipline={discipline}
      isPremiumAccount={member.isPremiumAccount}
    />
  )
}

MemberProfile.propTypes = {
  // required props
  member: memberPropType.isRequired,
  isOwner: PropTypes.bool.isRequired,
  toggleConnectSteamModal: PropTypes.func.isRequired,

  // container props
  handleFileUpload: PropTypes.func.isRequired,
  handleClickEdit: PropTypes.func.isRequired,
  background: imgPropType.isRequired,
  // optional props
}

MemberProfile.defaultProps = {
  // optional props
}

export default container(MemberProfile)
