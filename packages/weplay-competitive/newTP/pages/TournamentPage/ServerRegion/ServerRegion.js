import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Icon from 'weplay-components/Icon'

import Wrapper from 'weplay-competitive/components/Wrapper'

import styles from './ServerRegion.scss'

const wrapperModification = ['content']

const ServerRegion = ({
  // required props
  region,
  // container props
  // optional props
}) => {
  const t = useTranslation()
  return (
    <Wrapper>
      <Wrapper modifiers={wrapperModification}>
        <div className={styles.block}>
          <h5 className={styles.title}>
            <Icon
              size="medium"
              iconName="warning"
              className={styles.titleIcon}
            />
            <span className={styles.titleText}>{t(`competitive.tournament.server.${region}.title`)}</span>
          </h5>
          <p className={styles.text}>
            {t(`competitive.tournament.server.${region}.text`)}
          </p>
        </div>
      </Wrapper>
    </Wrapper>
  )
}

ServerRegion.propTypes = {
  // required props
  region: PropTypes.string.isRequired,
  // container props
  // optional props
}

ServerRegion.defaultProps = {
  // optional props
}

export default React.memo(ServerRegion)
