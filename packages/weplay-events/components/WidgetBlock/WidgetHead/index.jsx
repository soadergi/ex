import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from 'weplay-components/Icon'
import Link from 'weplay-components/Link'

import container from './container'
import styles from './styles.scss'

const tournaments = {
  fom: {
    title: 'CS:GO • Forge of Masters',
    description: 'Tournament page',
  },
  tow: {
    title: 'Dota 2 • Tug of War: Dire',
    description: 'Tournament page',
  },
}

const WidgetHead = ({
  // required props

  // container props
  toggleExpanded,
  isExpanded,
  // optional props
}) => (
  <div
    className={classNames(
      styles.block,
      {
        [styles.isExpanded]: isExpanded,
      },
    )}
  >
    <button
      type="button"
      className={classNames(
        styles.button,
        styles.tournament,
      )}
      onClick={toggleExpanded}
    >
      <p className={styles.title}>
        {tournaments.fom.title}
        <Icon
          iconName="arrow-down-second"
          size="small"
          className={styles.icon}
        />
      </p>
      <Link
        to="/torunament/"
        className={styles.description}
        target="_blank"
      >
        {tournaments.fom.description}
      </Link>
    </button>

    {isExpanded && (
      <button
        type="button"
        className={classNames(
          styles.button,
          styles.tournament,
        )}
      >
        <p className={styles.title}>
          {tournaments.tow.title}
        </p>
        <Link
          to="/torunament/"
          className={styles.description}
          target="_blank"
        >
          {tournaments.fom.description}
        </Link>
      </button>
    )}
  </div>

)

WidgetHead.propTypes = {
  // required props
  toggleExpanded: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  // container props

  // optional props
}

WidgetHead.defaultProps = {
  // optional props
}

export default container(WidgetHead)
