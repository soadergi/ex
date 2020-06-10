import React from 'react'
import PropTypes from 'prop-types'
import Tip from 'weplay-components/Tip'
import tournamentPropType from 'weplay-competitive/customPropTypes/tournamentPropType'

import styles from './styles.scss'
import TipLogged from './TipLogged'
import TipNotLoggedIn from './TipNotLoggedIn'
import TipAccessByPremium from './TipAccessByPremium'
import TipRegistrationWillBeClosed from './TipRegistrationWillBeClosed'
import container from './container'

const TipsBlock = ({
  // required props
  currentTournament,
  regWillBeClosed,
  tipType,
  // container props
  // optional props
  // props from HOC
}) => (
  <>
    {tipType && (
      <>
          {tipType === 'notLoggedIn' && (
            <Tip className={styles.tip}>
              <TipNotLoggedIn />
            </Tip>
          )}

          {tipType === 'tipAccessByPremium' && (
            <Tip className={styles.tip}>
              <TipAccessByPremium />
            </Tip>
          )}

          {(tipType !== 'notLoggedIn' && tipType !== 'tipAccessByPremium') && (
            <Tip
              className={styles.tip}
              isWarning
            >
              <TipLogged
                currentTournament={currentTournament}
                tipType={tipType}
              />
            </Tip>
          )}
      </>
    )}

    {/* TODO: remove false when needed */}
    {false && regWillBeClosed && <TipRegistrationWillBeClosed currentTournament={currentTournament} />}
  </>
)

TipsBlock.propTypes = {
  // required props
  currentTournament: tournamentPropType.isRequired,
  tipType: PropTypes.string.isRequired,
  regWillBeClosed: PropTypes.bool.isRequired,
  // container props
  // optional props
  // props from HOC
}

TipsBlock.defaultProps = {
  // optional props
}

export default container(TipsBlock)
