import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'weplay-components/Icon'

import Item from './Item'
import container from './container'
import styles from './styles.scss'

const List = ({
  // required props
  gamesDate,
  gamesTimes,
  background,
  // container props

  // optional props
}) => (
  <div className={styles.block}>
    <div
      style={background}
      className={styles.dateWrap}
    >
      <span className={styles.iconWrap}>
        <Icon
          iconName="gamepad"
          className={styles.icon}
        />
      </span>

      <span className={styles.date}>
        {gamesDate}
      </span>
    </div>

    <ul className={styles.list}>
      {gamesTimes.map((gamesTime, index) => (
        <li
          key={gamesTime}
          className={styles.item}
        >
          <Item
            itemIndex={index + 1}
            time={gamesTime}
          />
        </li>
      ))}
    </ul>
  </div>

)

List.propTypes = {
  // required props
  background: PropTypes.shape({}).isRequired,

  // container props
  gamesDate: PropTypes.string.isRequired,
  gamesTimes: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,

  // optional props
}

List.defaultProps = {
  // optional props
}

export default container(List)
