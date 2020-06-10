import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import imgPropType from 'weplay-core/customPropTypes/imgPropType'
import DefaultEventDuration from 'weplay-events/components/HeroSection/Header/EventDuration'
import tournamentDatePropTypes from 'weplay-core/customPropTypes/timeIntervalPropType'
import Image from 'weplay-components/Image'

import TournamentData from './TournamentData'
import styles from './styles.scss'
import container from './container'

const Header = ({
  logoUrl,
  periodDescription,
  prizeDescription,
  tournamentDates,
  tournamentTitle,
  dateFormat,
  PrizePoolComponent,
}) => (
  <div
    className={classNames(
      styles.block,
      styles[tournamentTitle],
    )}
  >
    <TournamentData
      tournamentTitle={tournamentTitle}
      description={periodDescription}
    >
      <DefaultEventDuration
        tournamentDates={tournamentDates}
        dateFormat={dateFormat}
        divider="-"
      />
    </TournamentData>

    {logoUrl && (
      <div
        className={styles.logo}
      >
        <figure
          className={styles.image}
        >
          <Image
            className="o-img-responsive u-mx-auto"
            src={logoUrl}
            alt={tournamentTitle}
          />
        </figure>
      </div>
    )}

    <TournamentData
      isTextAlignRight
      tournamentTitle={tournamentTitle}
      description={prizeDescription}
    >
      <PrizePoolComponent />
    </TournamentData>

  </div>
)

Header.propTypes = {
  logoUrl: imgPropType.isRequired,
  periodDescription: PropTypes.string.isRequired,
  prizeDescription: PropTypes.string.isRequired,
  i18nTexts: PropTypes.shape({}).isRequired,
  tournamentTitle: PropTypes.string.isRequired,
  tournamentDates: tournamentDatePropTypes.isRequired,
  PrizePoolComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({}),
    imgPropType,
  ]),
  dateFormat: tournamentDatePropTypes.isRequired,
}

Header.defaultProps = {
  PrizePoolComponent: null,
}

export default container(Header)
