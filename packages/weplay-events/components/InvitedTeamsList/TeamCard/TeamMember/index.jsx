import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import { SocialLinksMarkup } from 'weplay-components/SocialLinks'
import Image from 'weplay-components/Image'

import HeroesPreviewsList from '../HeroesPreviewsList'

import teamMemberPlaceholder from './team-member-placeholder.svg'
import container from './container'
import styles from './styles.scss'

const socialLinksModifiers = ['grey', 'teamMember']

const TeamMember = ({
  // required props
  player,
  playerRole,

  // props from container
  playerSocials,
  heroesPreviewsList,
  t,

  // optional props
}) => (
  <div className={styles.block}>
    <div className={styles.preview}>
      <Image
        src={player.picture || teamMemberPlaceholder}
        alt={player.name}
        className="o-img-responsive u-mx-auto"
      />
    </div>

    <div className={styles.details}>
      <p className={styles.label}>
        {t('tournamentStages.invitedTeams.name')}
      </p>
      <p className={styles.text}>{player.name}</p>

      {player.country && (
        <p className={styles.flag}>
          <Image
            src={player.country.url}
            alt={player.country.name}
            className={styles.flagImage}
            title={player.country.name}
          />
        </p>
      )}

      <p className={styles.label}>
        {t('tournamentStages.invitedTeams.position')}
      </p>
      <p className={styles.text}>{playerRole}</p>

      {false && ( // TODO: No url for this link yet
        <a
          href="#"
          className={styles.link}
        >
          rank and statistics
        </a>
      )}

      <div className={styles.footer}>
        {!R.isEmpty(heroesPreviewsList) && (
          <>
            <p className={styles.label}>Signature Hero:</p>
            <HeroesPreviewsList
              previews={heroesPreviewsList}
            />
          </>
        )}

        <SocialLinksMarkup
          links={playerSocials}
          className={styles.socials}
          modifiers={socialLinksModifiers}
          // analytic
          position="Player"
        />
      </div>

    </div>
  </div>
)

TeamMember.propTypes = {
  // required props
  player: PropTypes.shape({
    picture: PropTypes.string,
    name: PropTypes.string,
    nickName: PropTypes.string,
    socials: PropTypes.array,
    role: PropTypes.string,
    team: PropTypes.string,
    country: PropTypes.shape({
      url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    isCaptain: PropTypes.bool.isRequired,
  }).isRequired,
  playerRole: PropTypes.string.isRequired,

  // props from container
  t: PropTypes.func.isRequired,
  playerSocials: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    path: PropTypes.string,
  })).isRequired,
  heroesPreviewsList: PropTypes.arrayOf(PropTypes.shape({})),

  // optional props
}

TeamMember.defaultProps = {
  heroesPreviewsList: [],
}

export default container(TeamMember)
