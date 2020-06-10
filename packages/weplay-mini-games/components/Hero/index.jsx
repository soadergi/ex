import React from 'react'
import PropTypes from 'prop-types'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'

import bgImage from './img/sky.jpg'
import styles from './styles.scss'

const backgroundConfig = { backgroundImage: `url(${bgImage})` }

const Hero = ({
  // required props
  title,
  // props from container
  // optional props
}) => (
  <div
    className={styles.hero}
    style={backgroundConfig}
  >
    <div className={styles.content}>
      <ContentContainer>
        <div className={styles.body}>
          <h1 className={styles.title}>{title}</h1>
        </div>
      </ContentContainer>
    </div>
  </div>
)

Hero.propTypes = {
  // required props
  title: PropTypes.string.isRequired,
  // props from container
  // optional props
}

export default React.memo(Hero)
