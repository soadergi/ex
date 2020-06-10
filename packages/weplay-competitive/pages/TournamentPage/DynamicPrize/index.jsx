import React from 'react'
import PropTypes from 'prop-types'
import Wrapper from 'weplay-competitive/components/Wrapper'
import Section from 'weplay-competitive/components/Section'
import rewardPropType from 'weplay-competitive/customPropTypes/rewardPropType'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import styles from './styles.scss'
import container from './container'
import PrizeScale from './PrizeScale'
import InviteToDinamicPrizeTournament from './InviteToDinamicPrizeTournament'

const wrapperModification = ['content']
const sectionModification = ['noContainerPaddingX']

const DynamicPrize = ({
  // required props

  // container props
  rewards,
  totalSlots,
  emptySlots,
  inviteLink,
  // optional props
}) => {
  const t = useTranslation()

  return (
    <Wrapper>
      <Wrapper modifiers={wrapperModification}>
        <Section
          modifiers={sectionModification}
          title={t('competitive.tournament.prizePool.title')}
          className="u-pb-0"
        >
          <p className={styles.tip}>
            {t('competitive.tournament.prizePool.tip')}
          </p>
          <PrizeScale
            prizes={rewards}
            totalSlots={totalSlots}
            emptySlots={emptySlots}
            className={styles.scale}
          />
          <InviteToDinamicPrizeTournament
            link={inviteLink}
          />
        </Section>
      </Wrapper>
    </Wrapper>
  )
}

DynamicPrize.propTypes = {
  // required props

  // container props
  totalSlots: PropTypes.number.isRequired,
  emptySlots: PropTypes.number.isRequired,
  inviteLink: PropTypes.string.isRequired,
  rewards: PropTypes.arrayOf(
    rewardPropType,
  ).isRequired,
  // optional props
}

DynamicPrize.defaultProps = {
  // optional props
}

export default container(DynamicPrize)
