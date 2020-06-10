import React from 'react'
import classNames from 'classnames'

import LocalizedMoment from 'weplay-components/LocalizedMoment'
import Image from 'weplay-components/Image'
import Icon from 'weplay-components/Icon'
import Link from 'weplay-components/Link'
import LinkWrapper from 'weplay-components/LinkWrapper'

import classes from './Opportunity.scss'

const divider = ' - '
// TODO move to common components
const Opportunity = ({
  opportunity,
  image,
  className,
}) => (
  <div className={classNames(
    classes.block,
    className,
  )}
  >
    <LinkWrapper
      to={opportunity.imageLink}
      isExternal
    >
      <Image
        className={classNames(
          'o-img-responsive',
          classes.image,
        )}
        src={image}
      />
    </LinkWrapper>

    <div className={classes.content}>
      {/* TODO replace this shit to EventDuration component */}
      {opportunity.startDate && opportunity.endDate && (
      <div className={classes.dateWrap}>
        <Icon
          iconName="calendar"
          className="u-mr-1"
        />
        <LocalizedMoment
          dateTime={opportunity.startDate}
          formatKey="short"
        />
        <span className="u-mx-1">{divider}</span>
        <LocalizedMoment
          dateTime={opportunity.endDate}
          formatKey="short"
        />
      </div>
      )}

      <h3 className={classes.title}>
        {opportunity.innerTitle}
      </h3>

      <p className={classes.text}>{opportunity.innerText}</p>

      {opportunity.buttonUrl && (
        <Link
          to={opportunity.buttonUrl}
          className={classes.button}
        >
          {opportunity.buttonText}
          <Icon
            size="small"
            iconName="arrow-link"
            className="u-ml-1"
          />
        </Link>
      )}
    </div>
  </div>
)

export default React.memo(Opportunity)
