import classNames from 'classnames'
import React from 'react'

import Icon from 'weplay-components/Icon'
import Link from 'weplay-components/Link'

import classes from './TextTile.scss'

const TextTile = ({
  item,
}) => (
  <li
    className={classes.item}
  >
    <Link
      to={item.linkPath}
      className={classNames(
        classes.link,
        { [classes.disabled]: (item.linkPath === '/') },
      )}
    >
      <p className={classes.title}>
        {item.title}
        <Icon
          iconName="arrow-link"
          className="u-ml-1"
        />
      </p>
      <p className={classes.description}>{item.text}</p>
    </Link>
  </li>
)

export default React.memo(TextTile)
