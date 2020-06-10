import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Icon from 'weplay-components/Icon'

import { proposalsText } from './mocks/proposal'
import classes from './Proposals.scss'

const Proposals = () => {
  const t = useTranslation()

  return (
    <div className={classes.block}>
      {proposalsText.map(proposal => (
        <div
          key={proposal.title}
          className={classes.item}
        >
          <Icon
            iconName={proposal.icon}
            className={classes.icon}
          />

          <p className={classes.title}>{t(proposal.title)}</p>

          {Boolean(proposal.date) && <p className={classes.date}>{t(proposal.date)}</p>}

          <ul className={classes.list}>
            {proposal.items.map(item => (
              <li
                key={item.text}
                className={classes.info}
              >
                {Boolean(item.bold) && (
                  <span className="u-text-bold">
                    {t(item.bold)}
                  </span>
                )}
                <span>{t(item.text)}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default React.memo(Proposals)
