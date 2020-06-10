import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'

import container from './container'
import styles from './styles.scss'
import Tab from './Tab'

const TournamentGroupAndLanTabs = ({
  // required props
  links,
  tournamentTitle,

  // container props

  // optional props
}) => (
  <div className={classNames(
    styles.tabs,
    styles[tournamentTitle],
  )}
  >
    <ContentContainer>
      <div className={styles.wrap}>
        {links.map(link => (
          <Tab
            key={link.url}
            link={link}
          />
        ))}
      </div>
    </ContentContainer>
  </div>
)

TournamentGroupAndLanTabs.propTypes = {
  // required props
  links: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  tournamentTitle: PropTypes.string,

  // container props

  // optional props
}

TournamentGroupAndLanTabs.defaultProps = {
  // optional props
  tournamentTitle: '',
}

export default container(TournamentGroupAndLanTabs)
