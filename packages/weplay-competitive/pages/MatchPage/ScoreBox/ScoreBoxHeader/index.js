import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import SvgIcon from 'weplay-components/SvgIcon'
import Icon from 'weplay-components/Icon'

import styles from './styles.scss'

const ScoreBoxHeader = ({
  // required props
  scoreBoxHeadCells,
  // optional props
}) => {
  const t = useTranslation()

  return (
    <div className={styles.header}>
      <div className={classNames(
        styles.cell,
        styles.first,
      )}
      >
        <Icon
          className={styles.icon}
          iconName="team"
        />
        <span className={styles.title}>
          {t('competitive.match.scoreBox.title')}
        </span>
      </div>
      {scoreBoxHeadCells.map(headItem => (
        <div
          className={styles.cell}
          key={headItem.name}
        >
          {/* TODO: @frontend I need list of legacy icons here for replace this component */}
          <SvgIcon
            className={styles.icon}
            iconName={headItem.icon}
          />
        </div>
      ))}
    </div>
  )
}

ScoreBoxHeader.propTypes = {
  // required props

  // container props
  scoreBoxHeadCells: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  // optional props
}

ScoreBoxHeader.defaultProps = {
  // optional props
}

export default ScoreBoxHeader
