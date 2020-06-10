import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
import getFlagURLByCountryCode from 'weplay-core/helpers/getFlagURLByCountryCode'

import Avatar from 'weplay-components/Avatar'
import Image from 'weplay-components/Image'
import Icon from 'weplay-components/Icon'

import { REGIONS } from 'weplay-events/constants/regions'
import { tournamentTeamSelectors } from 'weplay-events/reduxs/tournamentTeam'

import styles from './Participant.scss'

const avatarResponsive = {
  md: '48',
}

const Participant = ({
  isWinner,
  participant,
  className,
  classNameWrapText,
  classNameCountryImg,
}) => {
  const isMobileWidth = useSelector(isMobileWidthSelector)
  const getTournamentTeamByIdSelector = useSelector(tournamentTeamSelectors.getRecordByIdSelector)
  const participantTeam = useMemo(() => getTournamentTeamByIdSelector(participant.relationships?.tournamentTeam?.id),
    [participant, getTournamentTeamByIdSelector])

  const countryFlagUrl = useMemo(() => (participantTeam?.country
    ? getFlagURLByCountryCode(participantTeam.country.toLowerCase())
    : ''),
  [participantTeam])

  const participantRegion = useMemo(() => REGIONS[participantTeam.region], [participantTeam])

  return (
    <div
      className={classNames(
        styles.block,
        className,
      )}
    >
      <Avatar
        className={styles.avatar}
        imageClassName={styles.figure}
        avatar={participant.logo}
        size="32"
        responsive={avatarResponsive}
        isObjectContain
      />

      <div className={classNames(
        styles.wrap,
        classNameWrapText,
      )}
      >
        <span className={styles.name}>
          {participant.name || 'TBD'}

          {(isWinner && !isMobileWidth) ? (
            <Icon
              iconName="cup"
              className={styles.winnerIcon}
            />
          ) : (
            <div className={styles.empty} />
          )}
        </span>

        {!isMobileWidth && countryFlagUrl && (
          <span className={styles.country}>
            <Image
              className={classNames(
                styles.image,
                classNameCountryImg,
              )}
              src={countryFlagUrl}
              alt=""
            />
            {participantRegion || participantTeam.country}
          </span>
        )}
      </div>
    </div>
  )
}

Participant.propTypes = {
  isWinner: PropTypes.bool.isRequired,
  participant: PropTypes.shape({
    score: PropTypes.number,
    name: PropTypes.string,
    logo: PropTypes.string,
    country: PropTypes.string,
    region: PropTypes.string,
    countryImgUrl: PropTypes.string,
    relationships: PropTypes.shape({}),
  }).isRequired,
  className: PropTypes.string,
  classNameWrapText: PropTypes.string,
  classNameCountryImg: PropTypes.string,
}

Participant.defaultProps = {
  className: '',
  classNameWrapText: '',
  classNameCountryImg: '',
}

export default Participant
