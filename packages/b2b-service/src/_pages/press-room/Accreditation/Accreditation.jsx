import React from 'react'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import Headline from 'weplay-components/HeadLine'
import Opportunity from '_pages/index/Opportunities/Opportunity/Opportunity'

import classes from './Accreditation.scss'

const Accreditation = ({
  title,
  description,
  events,
}) => {
  const t = useTranslation()
  return (
    <>
      <Headline
        className="u-text-center"
        title={title}
        text={description}
      />

      <div className={classes.wrap}>
        {events.map(event => (
          <Opportunity
            key={event.title}
            image={event.imageUrl}
            opportunity={{
              buttonText: t('pressRoomPage.accreditationCard.button'),
              ...event,
            }}
          />
        ))}
      </div>
    </>
  )
}
export default Accreditation
