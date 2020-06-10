import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Button, { BUTTON_PRIORITY } from 'weplay-components/Button'
import Icon from 'weplay-components/Icon'

import styles from './styles.scss'

const buttonModification = ['blockLink']

const CollapsibleTable = ({
  // required props

  // container props
  clickHandler,
  // optional props
  children,
  isOpen,
  hasSpoilerTrigger,
  title,
  isSectionTitle,
}) => {
  const t = useTranslation()
  return (
    <>
      <div className={classNames(
        styles.header,
        {
          [styles.isSectionTitle]: isSectionTitle,
        },
      )}
      >
        <p className={styles.subTitle}>
          {title}
        </p>
        {hasSpoilerTrigger && (
        <Button
          priority={BUTTON_PRIORITY.LINK}
          modifiers={buttonModification}
          onClick={clickHandler}
          className={classNames(
            styles.toggleShowAll,
            {
              [styles.isOpen]: isOpen,
            },
          )}
        >
          {
              isOpen ? t('competitive.member.performanceCard.hide')
                : t('competitive.member.performanceCard.showAll')
              }
          <Icon
            iconName="arrow-expand"
            className={styles.icon}
          />
        </Button>
        )}
      </div>
      {children}
    </>
  )
}

CollapsibleTable.propTypes = {
  // required props
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  // container props

  // optional props
  clickHandler: PropTypes.func,
  hasSpoilerTrigger: PropTypes.bool,
  isSectionTitle: PropTypes.bool,
}

CollapsibleTable.defaultProps = {
  // optional props
  clickHandler: () => {},
  hasSpoilerTrigger: false,
  isSectionTitle: false,
}

export default CollapsibleTable
