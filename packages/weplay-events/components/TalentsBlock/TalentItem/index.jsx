import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import imgPropType from 'weplay-core/customPropTypes/imgPropType'
import socialLinkPropType from 'weplay-core/customPropTypes/socialLinkPropType'

import Avatar from 'weplay-components/Avatar'
import Icon from 'weplay-components/Icon'

import TalentSocials from '../TalentSocials'

import container from './container'
import styles from './styles.scss'

const EVENT_ICON_NAMES = {
  tug_of_war: 'tugOfWar',
  international: 'theInternational',
  valentine_madness: 'valentiveMadness',
  forge_of_masters: 'forgeOfMasters',
  epicenter: 'epicenter',
}

const TalentItem = ({
  // required props
  talent,
  isActive,

  // container props
  socialLinks,

  // optional props
  mainFomLeague,
}) => (
  <div
    className={classNames(
      styles.block,
      styles[talent.discipline],
      { [styles.isActive]: isActive },
      { [styles.mainFomLeague]: mainFomLeague },
    )}
  >
    <div className={styles.avatarBorder}>
      <Avatar
        className={styles.avatar}
        avatar={talent.photo}
        size="136"
      />

      {talent.discipline && (
        <span className={styles.iconWrap}>
          <Icon
            className={styles.icon}
            iconName={talent.discipline}
          />
        </span>
      )}
    </div>
    <div className={styles.textWrap}>
      <p className={styles.nickName}>{`"${talent.nickname}"`}</p>
      <p className={styles.name}>
        {`${talent.firstName} ${talent.lastName}`}
      </p>

      {talent.position && (
        <span className={styles.position}>{talent.position}</span>
      )}

      {!R.isEmpty(talent.events) && (
        <div className={styles.wrapEvents}>
          {talent.events.map(event => (
            <div
              key={event.name}
              className={styles.wrapEvent}
            >
              <Icon
                iconName={EVENT_ICON_NAMES[event.name]}
                size="small"
                className={styles.eventIcon}
              />
              <p className={styles.eventName}>
                {event.description}
              </p>
            </div>
          ))}
        </div>
      )}
      <TalentSocials
        nickname={talent.nickname}
        socialLinks={socialLinks}
        mainFomLeague={mainFomLeague}
      />
    </div>
  </div>

)

TalentItem.propTypes = {
  // required props
  isActive: PropTypes.bool.isRequired,
  talent: PropTypes.shape({
    id: PropTypes.string,
    photo: imgPropType,
    position: PropTypes.string,
    discipline: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    hoursPlayed: PropTypes.string,
    nickname: PropTypes.string,
    socialLinks: PropTypes.arrayOf(PropTypes.shape({})),
    events: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,

  // container props
  socialLinks: PropTypes.arrayOf(socialLinkPropType).isRequired,

  // optional props
  mainFomLeague: PropTypes.bool,
}

TalentItem.defaultProps = {
  // optional props
  mainFomLeague: false,
}

export default container(TalentItem)
