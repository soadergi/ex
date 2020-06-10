import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ButtonClose from 'weplay-components/ButtonClose'

import styles from './styles.scss'
import container from './container'

const DeleteArticleControls = ({
  // required props
  isDeletionConfirming,
  handleConfirmDeletion,
  // container props
  i18nTexts,
  handleDeleteArticle,
  // optional props
  className,
}) => (
  <div className={classNames(
    styles.edit,
    className,
  )}
  >
    {!isDeletionConfirming
      ? <ButtonClose onButtonClick={handleConfirmDeletion} />
      : (
        <div className={styles.confirm}>
          <span className={styles.confirmMessage}>
            {i18nTexts.article.confirm.tip}
          </span>
          <button
            onClick={handleConfirmDeletion}
            className={classNames(
              styles.save,
              styles.control,
            )}
            type="button"
          >
            {i18nTexts.article.confirm.cancel}
          </button>
          <button
            onClick={handleDeleteArticle}
            className={classNames(
              styles.remove,
              styles.control,
            )}
            type="button"
          >
            {i18nTexts.article.confirm.delete}
          </button>
        </div>
      )
    }
  </div>
)

DeleteArticleControls.propTypes = {
  // required props
  isDeletionConfirming: PropTypes.bool.isRequired,
  handleConfirmDeletion: PropTypes.func.isRequired,
  // container props
  i18nTexts: PropTypes.shape({}).isRequired,
  handleDeleteArticle: PropTypes.func.isRequired,
  // optional props
  className: PropTypes.string,
}

DeleteArticleControls.defaultProps = {
  // optional props
  className: '',
}

export default container(DeleteArticleControls)
