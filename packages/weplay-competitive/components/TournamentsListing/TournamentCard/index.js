import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { formatPrizeWithDigit } from 'weplay-core/helpers/formatPrizeWithDigits'
import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'

import Icon from 'weplay-components/Icon'
import Link from 'weplay-components/Link'
import Label from 'weplay-components/Label'
import BackgroundFullWidth from 'weplay-components/BackgroundFullWidth'

import gameModePropType from 'weplay-competitive/customPropTypes/gameModePropType'
import organizerPropType from 'weplay-competitive/customPropTypes/organizerPropTypes'
import tournamentPropType from 'weplay-competitive/customPropTypes/tournamentPropType'
import { DISCIPLINE_NAME_CSGO } from 'weplay-competitive/config/disciplines'
import { AT__CURRENT_TOURNAMENT } from 'weplay-competitive/analytics/amplitude'

import CasualTournament from './CasualTournament/CasualTournament'
import decorImage from './img/featured.svg'
import container from './container'
import styles from './style.scss'

const mods = {
  featured: 'featured',
}

const featuredBackground = { backgroundImage: `url(${decorImage})` }

const TournamentCard = ({
  // required props
  tournament,
  discipline,

  // props from container
  gameMode,
  tournamentUrl,
  page,
  source,
  // TODO: remove from container @Frontend
  // subStatus,
  handleClickTopNotchImage,
  handleClickRegularCardImage,
  handleClickTopNotchLink,
  handleClickRegularCardLink,
  accessIcon,

  // optional props
  // TODO: TM team - change naming here, this is string not array.
  modifiers: modifier,
}) => {
  const t = useTranslation()
  return (
    <tr
      className={classNames(
        styles.block,
        styles[modifier],
      )}
      style={modifier === mods.featured ? featuredBackground : null}
    >
      <td className={classNames(
        styles.column,
        styles.header,
      )}
      >
        <div className={styles.headerWrapper}>
          <Link
            to={tournamentUrl}
            className={styles.logo}
            onClick={modifier === mods.featured ? handleClickTopNotchImage : handleClickRegularCardImage}
            {...getAnalyticsAttributes({
              'amplitude-action': AT__CURRENT_TOURNAMENT,
              'amplitude-place': 'image',
              'amplitude-featured': modifier === mods.featured,
              'amplitude-discipline': discipline,
              ...(modifier !== mods.featured) && {
                'amplitude-page': page,
                'amplitude-source': source,
                'amplitude-mode': gameMode.title,
              },
            })}
          >
            <BackgroundFullWidth src={tournament.avatar}>
              {modifier === mods.featured && (
                <Label
                  color="magenta"
                  className={styles.special}
                >
                  {t('competitive.tournaments.modifier.featured')}
                </Label>
              )}
            </BackgroundFullWidth>
          </Link>
          <div className={styles.headerText}>
            <Link
              to={tournamentUrl}
              className={styles.title}
              onClick={modifier === mods.featured ? handleClickTopNotchLink : handleClickRegularCardLink}
              {...getAnalyticsAttributes({
                'amplitude-action': AT__CURRENT_TOURNAMENT,
                'amplitude-place': 'text',
                'amplitude-featured': modifier === mods.featured,
                'amplitude-discipline': discipline,
                ...(modifier !== mods.featured) && {
                  'amplitude-page': page,
                  'amplitude-source': source,
                  'amplitude-mode': gameMode.title,
                },
              })}
            >
              {tournament.name}
            </Link>

            {discipline === DISCIPLINE_NAME_CSGO && (
              <span className={styles.region}>
                <Icon
                  size="small"
                  iconName="region"
                  className={classNames(
                    'u-mr-1',
                    styles.regionIcon,
                  )}
                />
                <span className={styles.regionText}>
                  {t(`competitive.tournament.server.${tournament.serversRegion.name}.title`)}
                </span>
              </span>
            )}
          </div>
        </div>
      </td>

      {modifier !== mods.featured && (
        <CasualTournament
          tournament={tournament}
          discipline={discipline}
          gameMode={gameMode}
          accessIcon={accessIcon}
        />
      )}

      <td className={classNames(
        styles.column,
        styles.footer,
      )}
      >
        <div className={styles.columnTitle}>
          {modifier === mods.featured && (
            <Icon
              className={styles.icon}
              iconName="prize"
            />
          )}
          {t('competitive.member.game.prizes')}
        </div>
        <p className={styles.subTitle}>
          {tournament.prize || `$${formatPrizeWithDigit(tournament.prizePool)}`}
        </p>
      </td>
    </tr>
  )
}

TournamentCard.propTypes = {
  // required props
  tournament: tournamentPropType.isRequired,
  discipline: PropTypes.string.isRequired,

  // props from container
  tournamentUrl: PropTypes.string.isRequired,
  gameMode: gameModePropType.isRequired,
  organizer: organizerPropType.isRequired,
  handleClickTopNotchImage: PropTypes.func.isRequired,
  handleClickRegularCardImage: PropTypes.func.isRequired,
  handleClickTopNotchOrganizer: PropTypes.func.isRequired,
  handleClickTopNotchLink: PropTypes.func.isRequired,
  handleClickRegularCardLink: PropTypes.func.isRequired,
  accessIcon: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,

  // optional props
  modifiers: PropTypes.oneOf([...Object.keys(mods), '']),
}

TournamentCard.defaultProps = {
  // props from container

  // optional props
  modifiers: '',
}

export default container(TournamentCard)
