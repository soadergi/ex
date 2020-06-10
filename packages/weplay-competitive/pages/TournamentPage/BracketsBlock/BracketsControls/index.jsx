import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Item from './Item'
import styles from './styles.scss'

const BracketsControls = ({
  // required props
  controls,
  tips,
  // container props

  // optional props
}) => {
  const t = useTranslation()

  return (
    <div className={styles.block}>
      <p className={styles.title}>
        {t('competitive.tournament.brackets.title')}
      </p>
      <div className={styles.wrapper}>
        {tips.map(tip => (
          <Item
            key={tip.text}
            iconName={tip.iconName}
            text={tip.text}
            color={tip.color}
          />
        ))}
        {controls.map(control => (
          <Item
            key={control.text}
            iconName={control.iconName}
            text={control.text}
            onClickHandler={control.clickHandler}
          />
        ))}
      </div>
    </div>
  )
}

BracketsControls.propTypes = {
  // required props
  controls: PropTypes.arrayOf(PropTypes.shape({
    iconName: PropTypes.string,
    text: PropTypes.string,
    onClickHandler: PropTypes.func,
  })).isRequired,
  tips: PropTypes.arrayOf(PropTypes.shape({
    iconName: PropTypes.string,
    text: PropTypes.string,
    color: PropTypes.string,
  })).isRequired,
  // container props

  // optional props
}

BracketsControls.defaultProps = {
  // optional props
}

export default BracketsControls
