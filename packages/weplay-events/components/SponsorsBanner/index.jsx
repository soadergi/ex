import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import imgPropType from 'weplay-core/customPropTypes/imgPropType'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'

import SponsorItem from './SponsorItem'
import styles from './styles.scss'

const SponsorsBanner = ({
  // required props

  // container props
  sponsors,

  // optional props
  color,
}) => (
  <div className={classNames(
    styles.block,
    styles[color],
  )}
  >
    <ContentContainer>
      <ul className={styles.list}>
        {sponsors.map(sponsor => (
          <SponsorItem
            key={sponsor.name}
            imageUrl={sponsor.url}
            name={sponsor.name}
            linkUrl={sponsor.link}
          />
        ))}
      </ul>
    </ContentContainer>
  </div>

)

SponsorsBanner.propTypes = {
  // required props

  // container props
  sponsors: PropTypes.arrayOf(PropTypes.shape({
    url: imgPropType.isRequired,
    name: PropTypes.string,
    link: PropTypes.string,
  })).isRequired,
  // optional props
  color: PropTypes.string,
}

SponsorsBanner.defaultProps = {
  // optional props
  color: '',
}

export default memo(SponsorsBanner)
