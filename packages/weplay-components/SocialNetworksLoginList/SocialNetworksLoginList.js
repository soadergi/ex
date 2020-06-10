import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'

import { getSocialConfigs } from '../SocialNetworksLogin/consts'
import { getComponentsFromNames } from '../SocialNetworksLogin/utils'

import styles from './SocialNetworksLoginList.scss'

const SocialNetworksLoginList = ({
  logAuthEvent,
  requestParams,
}) => {
  const globalScope = useSelector(globalScopeSelector)
  const socialNetworks = getComponentsFromNames(getSocialConfigs(globalScope.location.origin))

  return (
    <ul className={styles.block}>
      {socialNetworks.map(({ config, component: SocialLogin }) => (
        <li
          className={styles.item}
          key={config.symbol}
        >
          <SocialLogin
            config={config}
            logAuthEvent={logAuthEvent}
            axiosParams={requestParams}
          />
        </li>
      ))}
    </ul>
  )
}

SocialNetworksLoginList.propTypes = {
  logAuthEvent: PropTypes.func.isRequired,
  requestParams: PropTypes.shape({}),
}

SocialNetworksLoginList.defaultProps = {
  requestParams: {},
}

export default SocialNetworksLoginList
