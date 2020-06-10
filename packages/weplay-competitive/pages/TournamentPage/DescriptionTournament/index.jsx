import React from 'react'
import PropTypes from 'prop-types'
import Section from 'weplay-competitive/components/Section'
import Wrapper from 'weplay-competitive/components/Wrapper'

import styles from './style.scss'

const sectionModification = ['noContainerPaddingX']
const wrapperModification = ['content']

const DescriptionTournament = ({
  // required props
  title,
  text,
  // container props

  // optional props

}) => (
  <div className={styles.content}>
    <Wrapper>
      <Wrapper
        modifiers={wrapperModification}
        className={styles.wrapper}
      >
        <Section
          title={title}
          modifiers={sectionModification}
        >
          <div
            className={styles.container}
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </Section>
      </Wrapper>
    </Wrapper>
  </div>
)

DescriptionTournament.propTypes = {
  // required props
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  // container props

  // optional props
}

DescriptionTournament.defaultProps = {
  // optional props
}

export default DescriptionTournament
