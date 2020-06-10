import React from 'react'

import classes from './PartnerWithUs.scss'

const PartnerWithUs = ({ items }) => (
  <div className={classes.block}>
    {items.map((item, index) => {
      const number = `0${index + 1}`

      return (
        <li
          key={item.title}
          className={classes.item}
        >
          <span className={classes.number}>{number}</span>
          <p className={classes.title}>{item.title}</p>
          <p className={classes.text}>{item.description}</p>
        </li>
      )
    })}
  </div>
)

export default React.memo(PartnerWithUs)
