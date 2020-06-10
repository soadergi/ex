import React from 'react'
import PropTypes from 'prop-types'
import Breadcrumbs from 'weplay-components/Breadcrumbs'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'

import bgImage from './img/sky.jpg'
import container from './container'
import styles from './styles.scss'

const backgroundConfig = { backgroundImage: `url(${bgImage})` }

const HeroSection = ({
  // required props
  title,
  breadcrumbsEntityName,
  breadcrumbsModifications,
  // props from container
  // optional props
}) => (
  <div
    className={styles.hero}
    style={backgroundConfig}
  >
    <div className={styles.content}>
      <ContentContainer>
        <Breadcrumbs
          entityName={breadcrumbsEntityName}
          modifications={breadcrumbsModifications}
          className={styles.breadcrumbs}
        />
        <div className={styles.body}>
          <h1 className={styles.title}>{title}</h1>
        </div>
      </ContentContainer>
    </div>
  </div>
)

HeroSection.propTypes = {
  // required props
  title: PropTypes.string.isRequired,
  breadcrumbsEntityName: PropTypes.string.isRequired,
  // props from container
  // optional props
  breadcrumbsModifications: PropTypes.arrayOf(PropTypes.string),
}

HeroSection.defaultProps = {
  breadcrumbsModifications: [],
}

export default container(HeroSection)
