import PropTypes from 'prop-types'
import React, { useMemo } from 'react'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'

import Icon from 'weplay-components/Icon'
import Button, { BUTTON_COLOR, BUTTON_SIZE } from 'weplay-components/Button'

import { AT_SUBMENU_JOIN_DISCORD } from 'weplay-competitive/analytics/amplitude'
import MMButton from 'weplay-competitive/components/MM/MMButton'
import { FEATURES } from 'weplay-competitive/config/features'
import useDiscipline from 'weplay-competitive/hooks/useDiscipline'
import withDiscipline from 'weplay-competitive/HOCs/withDiscipline'
import useFeatureSupport from 'weplay-competitive/hooks/useFeatureSupport'

import styles from './styles.scss'

const SectionButtonsGroup = ({
  locale,
  t,
}) => {
  const { isFeatureSupported } = useFeatureSupport()
  const { tournamentDiscipline } = useDiscipline()
  const isShowMMButton = useMemo(
    () => isFeatureSupported(FEATURES.MM) && tournamentDiscipline?.hasMM,
    [tournamentDiscipline, isFeatureSupported],
  )

  return (
    <div className={styles.block}>
      <Button
        color={BUTTON_COLOR.DISCORD}
        size={BUTTON_SIZE.MD}
        href={tournamentDiscipline.discord[locale]}
        className={styles.button}
        {...getAnalyticsAttributes({
          'amplitude-action': AT_SUBMENU_JOIN_DISCORD,
          'amplitude-discipline': tournamentDiscipline.name,
        })}
      >
        <Icon
          iconName="discord"
          size="medium"
          className="u-mr-1"
        />
        {t('competitive.dotaUnderlordsLanding.banner.button')}
      </Button>

      {isShowMMButton && (
        <div className={styles.mmButton}>
          <MMButton />
        </div>
      )}
    </div>
  )
}

SectionButtonsGroup.propTypes = {
  // props from HOC
  locale: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
}

export default withLocale(withDiscipline(SectionButtonsGroup))
