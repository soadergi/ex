import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { setCSSModifiers } from 'weplay-core/helpers/setCSSModifiers'

import Icon from '../Icon'

import container from './container'
import styles from './styles.scss'
import { MUTUAL_MODALS } from './config'

const mods = R.concat(['paddingLess', 'widthAuto', 'closeBtnPositionSm'], R.values(MUTUAL_MODALS))

const ModalBase = ({
  // required props
  isShown,
  // optional props
  children,
  modifiers,
  handleClose,
  isCloseBtnHidden,
}) => (
  <div
    className={classNames(
      styles.block,
      setCSSModifiers(modifiers, styles),
      {
        [styles.isShown]: isShown,
      },
    )}
  >
    <div className={styles.dialog}>
      <div className={styles.content}>
        {(handleClose && !isCloseBtnHidden) && (
          <button
            type="button"
            className={styles.close}
            onClick={handleClose}
          >
            <Icon
              className={styles.icon}
              iconName="close"
            />
          </button>
        )}
        {isShown && children}
      </div>
    </div>
  </div>
)

ModalBase.propTypes = {
  // required props
  children: PropTypes.node.isRequired,
  // optional props
  isShown: PropTypes.bool,
  modifiers: PropTypes.arrayOf(PropTypes.oneOf(mods)),
  handleClose: PropTypes.func,
  isCloseBtnHidden: PropTypes.bool,
}

ModalBase.defaultProps = {
  // optional props
  isShown: false,
  modifiers: [],
  handleClose: null,
  isCloseBtnHidden: false,
}

export default container(ModalBase)
