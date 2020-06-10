import * as PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useAction from 'weplay-core/helpers/useAction'
import { getUser } from 'weplay-core/reduxs/_legacy/auth/actions'
import { userIdSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import Modals from 'weplay-platform/components/Modals/loadable'

const PlainLayout = ({
  routesNode,
}) => {
  const userId = useSelector(userIdSelector)
  const { getUserData } = useAction({ getUserData: getUser })

  useEffect(() => {
    if (userId) getUserData()
  }, [userId])

  return (
    <>
      {routesNode}
      <Modals />
    </>
  )
}

PlainLayout.propTypes = {
  routesNode: PropTypes.node.isRequired,
}
export default PlainLayout
