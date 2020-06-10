import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import SlideToggle from 'weplay-components/SlideToggle'
import Icon from 'weplay-components/Icon'

import styles from '../styles.scss'
import Game from '../Game'

import container from './container'

const SLIDE_TOGGLE_STATES = {
  collapsed: 'COLLAPSED',
  expanded: 'EXPANDED',
  collapsing: 'COLLAPSING',
}

const DefaultScoreGroup = ({
  // required props
  games,
  name,
  collapsed,

  // container props

  // optional props
}) => (
  <SlideToggle
    duration={400}
    bestPerformance
    collapsed={collapsed}
  >
    {
      ({
        onToggle,
        setCollapsibleElement,
        range,
        toggleState,
      }) => (
        <div className={styles.group}>
          <a
            className={classNames(
              styles.title,
              { [styles.isOpen]: range > 0 },
            )}
            onClick={onToggle}
          >
            {name}

            <Icon
              iconName="arrow-down-second"
              className={styles.arrow}
              size="small"
            />
          </a>

          <div
            className={classNames(
              styles.games,
              { [styles.isExpanded]: toggleState === SLIDE_TOGGLE_STATES.expanded },
            )}
            ref={setCollapsibleElement}
          >
            {games.map((game, gameIndex) => (
              <div
                key={gameIndex} // eslint-disable-line react/no-array-index-key
                className={classNames(
                  styles.game,
                  // TODO(@JS) Need to set valid condition depending on games count
                  // `hasBorderBottom` - last game in first column
                  // `hasBorderRadiusBottom` - last game in first column
                  // `hasBorderRadiusTop` - first game in second column
                  {
                    [styles.hasBorderBottom]: (gameIndex + 1) === (games.length / 2),
                    [styles.hasBorderRadiusBottom]: (gameIndex + 1) === (games.length / 2),
                    [styles.hasBorderRadiusTop]: gameIndex === (games.length / 2),
                  },
                )}
              >
                <Game
                  key={game.startDatetime}
                  game={game}
                />
              </div>
            ))}
          </div>
        </div>
      )
    }
  </SlideToggle>

)

DefaultScoreGroup.propTypes = {
  // required props
  games: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  name: PropTypes.string.isRequired,
  collapsed: PropTypes.bool,

  // props from container

  // optional props
}

DefaultScoreGroup.defaultProps = {
  // optional props
  collapsed: false,
}

export default container(DefaultScoreGroup)
