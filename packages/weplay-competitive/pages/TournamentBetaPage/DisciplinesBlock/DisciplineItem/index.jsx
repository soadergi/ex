import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import Icon from 'weplay-components/Icon'

import styles from './styles.scss'

const DisciplineItem = ({
  // required props
  iconStyle,
  iconName,
  isActive,
  disciplineName,
  // container props

  // optional props
}) => {
  const t = useTranslation()

  return (
    <>
      <Icon
        className={classNames(
          styles.icon,
          styles[iconStyle],
          {
            [styles.isActive]: isActive,
          },
        )}
        iconName={iconName}
        size="large"
      />
      <p className={classNames(
        styles.disciplineText,
        {
          [styles.isActive]: isActive,
        },
      )}
      >
        {isActive
          ? disciplineName
          : t('competitive.tournamentLanding.disciplinesBlock.inActiveDiscipline')}
      </p>
    </>
  )
}

DisciplineItem.propTypes = {
  // required props
  iconStyle: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  disciplineName: PropTypes.string.isRequired,
  // container props

  // optional props
}

DisciplineItem.defaultProps = {
  // optional props
}

export default DisciplineItem
