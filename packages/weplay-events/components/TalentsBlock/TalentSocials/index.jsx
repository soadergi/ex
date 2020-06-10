import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import SocialIcons from 'weplay-components/SocialIcons'
import socialLinkPropType from 'weplay-core/customPropTypes/socialLinkPropType'

import container from './container'
import styles from './styles.scss'

const TalentSocials = ({
  // required props
  nickname,
  socialLinks,
  // container props

  // optional props
  mainFomLeague,
}) => (
  <div className={classNames(
    styles.block,
    { [styles.mainFomLeague]: mainFomLeague },
  )}
  >
    <SocialIcons
      className={styles.list}
      links={socialLinks}
      color="blue"
      nickname={nickname} // analytic
    />
  </div>
)

TalentSocials.propTypes = {
  // required props
  socialLinks: PropTypes.arrayOf(socialLinkPropType).isRequired,
  nickname: PropTypes.string.isRequired,
  // container props

  // optional props
  mainFomLeague: PropTypes.bool,
}

TalentSocials.defaultProps = {
  // optional props
  mainFomLeague: false,
}

export default container(TalentSocials)
