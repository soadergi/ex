import React from 'react'
import PropTypes from 'prop-types'
// import getIsServer from 'weplay-core/helpers/ssr/getIsServer'
import IsoHead from 'react-helmet'

import container from './container'

// const IsoHead = require('react-helmet').Helmet
// TODO: uncomment below when working on ssr
// if (getIsServer()) {
//   IsoHead = require('next/head').default;// eslint-disable-line
// } else {
//   IsoHead = require('react-helmet').Helmet;// eslint-disable-line
// }
const IsomorphicHead = ({
  // required props
  children,

  // container props

  // optional props
}) => (
  <IsoHead>
    {children}
  </IsoHead>
)

IsomorphicHead.propTypes = {
  // required props
  children: PropTypes.node.isRequired,

  // container props

  // optional props
}

IsomorphicHead.defaultProps = {
  // optional props
}

export default container(IsomorphicHead)
