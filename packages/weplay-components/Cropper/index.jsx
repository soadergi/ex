import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import LegacyButton from 'weplay-components/LegacyButton'

import './cropper.scss'
import styles from './styles.scss'
import container from './container'

const Cropper = ({
  selectedBase64Image,
  setCropperImageRef,
  cropImage,
  removePhoto,
  handleZoom,
  i18nTexts,
}) => (
  <>
    <div className={styles.block}>
      <p className={styles.title}>{i18nTexts.cabinet.cropper.title}</p>
      <div className={styles.cropper}>
        <img
          ref={setCropperImageRef}
          src={selectedBase64Image}
          alt="user-avatar-cropper"
        />
      </div>
      <div className={styles.rangeWrapper}>
        <span className={styles.square} />
        <input
          className={styles.range}
          type="range"
          name="cropper-zoom"
          min="0"
          max="10"
          step="0.1"
          defaultValue="0"
          onInput={handleZoom}
        />
        <span className={classNames(
          styles.square,
          styles.big,
        )}
        />
      </div>
      <div className={styles.buttonBlock}>
        <LegacyButton
          type="button"
          text={i18nTexts.cabinet.cropper.button}
          className={styles.button}
          onClick={cropImage}
        />
        <button
          className={styles.removeButton}
          type="button"
          onClick={removePhoto}
        >
          {i18nTexts.cabinet.cropper.link}
        </button>
      </div>
    </div>
  </>
)

Cropper.propTypes = {
  selectedBase64Image: PropTypes.string.isRequired,
  setCropperImageRef: PropTypes.func.isRequired,
  cropImage: PropTypes.func.isRequired,
  removePhoto: PropTypes.func.isRequired,
  handleZoom: PropTypes.func.isRequired,
  i18nTexts: PropTypes.shape({}).isRequired,
}

export default container(Cropper)
