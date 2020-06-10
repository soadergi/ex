import React, { useMemo } from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import getFlagURLByCountryCode from 'weplay-core/helpers/getFlagURLByCountryCode'

import Image from 'weplay-components/Image'
import SocialIcons from 'weplay-components/SocialIcons'
import Icon from 'weplay-components/Icon'

import useTeamMember from 'weplay-events/pages/EventPage/hooks/useTeamMember'
import playerPropType from 'weplay-events/customPropTypes/playerPropType'

import teamMemberPlaceholder from './team-member-placeholder.svg'
import styles from './styles.scss'

const TeamMember = ({
  player,
}) => {
  const { playerSocials, isCaptain } = useTeamMember({ player })
  const t = useTranslation()
  const countryFlagUrl = player?.country
    ? getFlagURLByCountryCode(player.country.toLowerCase())
    : ''
  const socialLinks = useMemo(() => playerSocials.map(({ path, icon, ...rest }) => ({
    ...rest,
    url: path,
    type: icon,
  })), [playerSocials])

  return (
    <div className={styles.block}>
      {countryFlagUrl && (
        <Image
          src={countryFlagUrl}
          alt={player.country}
          className={styles.flag}
        />
      )}

      <div className={styles.preview}>
        <Image
          src={player.logoUrl || teamMemberPlaceholder}
          alt={player.name}
          className="o-img-responsive u-mx-auto"
        />
      </div>

      <div className={styles.details}>
        <p className={styles.label}>{t('events.teamCard.teamMember.name')}</p>

        <div className={styles.text}>
          {isCaptain && (
            <div className={styles.borderArrow}>
              <Icon
                size="small"
                iconName="double-arrow-up"
                className={styles.icon}
              />
            </div>
          )}
          {player.name}
        </div>

        <div className={styles.footer}>
          <SocialIcons
            className={styles.socials}
            links={socialLinks}
            color="blue"
          />
        </div>
      </div>
    </div>
  )
}

TeamMember.propTypes = {
  player: playerPropType.isRequired,

  // optional props
}

TeamMember.defaultProps = {
}

export default TeamMember
