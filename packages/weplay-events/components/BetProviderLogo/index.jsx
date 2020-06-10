import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import imgPropType from 'weplay-core/customPropTypes/imgPropType'
import Image from 'weplay-components/Image'

import styles from './styles.scss'
import container from './container'

const BetProviderLogo = ({
  // required props
  gameUrl,
  logoUrl,
  logWinterMadnessSponsorAction,

  // optional props
  className,
}) => (
  <a
    target="_blank"
    rel="noreferrer noopener"
    href={gameUrl}
    className={classNames(
      styles.logo,
      className,
    )}
    onClick={logWinterMadnessSponsorAction}
  >
    <Image
      src={logoUrl}
      alt=""
      className="o-img-responsive"
    />
  </a>
)

BetProviderLogo.propTypes = {
  // required props
  gameUrl: PropTypes.string.isRequired,
  logoUrl: imgPropType.isRequired,
  logWinterMadnessSponsorAction: PropTypes.func.isRequired,

  // optional props
  className: PropTypes.string,
}

BetProviderLogo.defaultProps = {
  className: '',
}

export default container(BetProviderLogo)
