import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Button from 'weplay-components/Button'
import Avatar from 'weplay-components/Avatar'
import ModalHeader from 'weplay-components/Modals/ModalHeader'
import ModalBase from 'weplay-components/ModalBase'

import styles from './styles.scss'

const AlertModal = ({
  // required props
  isShown,
  onCloseModal,
  onConfirmModal,
  texts,
  preview,
  // props from container
  // optional props

}) => {
  const t = useTranslation()
  return (
    <ModalBase
      isShown={isShown}
      handleClose={onCloseModal}
    >
      <div className={classNames(
        {
          [styles.center]: preview,
        },
      )}
      >
        {preview && (
          <Avatar
            className={styles.preview}
            avatar={preview}
            size="64"
          />
        )}
        <ModalHeader
          title={t(`${texts}.title`)}
          subtitle={t(`${texts}.subTitle`)}
        />
        <div className="u-flex-sm">
          <Button
            className={styles.right}
            onClick={onConfirmModal}
          >
            {t(`${texts}.closeBtnText`)}
          </Button>
        </div>
      </div>
    </ModalBase>
  )
}

AlertModal.propTypes = {
  // required props
  isShown: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onConfirmModal: PropTypes.func.isRequired,
  texts: PropTypes.string.isRequired,
  // optional props
  preview: PropTypes.string.isRequired,
}

AlertModal.defaultProps = {
  // optional props
}

export default React.memo(AlertModal)
