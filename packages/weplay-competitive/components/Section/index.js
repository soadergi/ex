import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import { setCSSModifiers } from 'weplay-core/helpers/setCSSModifiers'
import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'

import Icon from 'weplay-components/Icon'
import Label from 'weplay-components/Label'

import Wrapper from 'weplay-competitive/components/Wrapper'
import SectionButtonsGroup from 'weplay-competitive/components/SectionButtonsGroup'

import styles from './style.scss'

const mods = [
  'small',
  'noContainerPaddingX',
  'noPaddingY',
  'greyBackground',
  'textWhite',
  'ladderItem',
]

const Section = ({
  // required props
  children,
  title,

  // optional props
  icon,
  iconSize,
  iconType,
  subtitle,
  modifiers,
  id,
  linkText,
  linkHandler,
  linkIcon,
  className,
  isTitleH1,
  showSoonLabelText,
  containerClassName,
  hasSectionButtonsGroup,
  ...rest
}) => (
  <section
    className={classNames(
      styles.block,
      setCSSModifiers(modifiers, styles),
      className,
    )}
    {...rest}
  >
    <div
      id={id}
      className={styles.anchorCorrector}
    />
    <Wrapper className={styles.container}>
      {title && (
      <div className={styles.header}>
        <div className={styles.title}>
          {icon && (
          <div className={styles.titleIcon}>
            <Icon
              iconName={icon}
              size={iconSize}
              className={styles.icon}
              type={iconType}
            />
          </div>
          )}
          {isTitleH1
            ? <h1 className={styles.titleText}>{title}</h1>
            : <p className={styles.titleText}>{title}</p>}
          {showSoonLabelText && (
          <Label
            className={styles.label}
            color="magenta"
          >
            {showSoonLabelText}
          </Label>
          )}
        </div>
        {subtitle && (<p className={styles.subTitle}>{subtitle}</p>)}
        {linkText && (
        <button
          type="button"
          className={classNames(
            styles.link,
            styles.linkBtn,
          )}
          onClick={linkHandler}
          {...getAnalyticsAttributes({
            action: LOOKUP,
            category: LOOKUP,
          })}
        >
          <Icon
            iconName={linkIcon}
            size={iconSize}
            className={classNames(
              styles.linkIcon,
              {
                [styles.isSmall]: linkIcon === 'plus',
              },
            )}
          />
          {linkText}
        </button>
        )}
        {hasSectionButtonsGroup && (
          <div className={styles.link}>
            <SectionButtonsGroup />
          </div>
        )}
      </div>
      )}
    </Wrapper>
    <div className={classNames(
      containerClassName,
      {
        [styles.wrapper]: !containerClassName,
      },
    )}
    >
      {children}
    </div>
  </section>
)

Section.propTypes = {
  children: PropTypes.node.isRequired,

  title: PropTypes.string,
  icon: PropTypes.string,
  iconSize: PropTypes.string,
  iconType: PropTypes.string,
  subtitle: PropTypes.string,
  id: PropTypes.string,
  linkText: PropTypes.string,
  linkIcon: PropTypes.string,
  linkHandler: PropTypes.func,
  className: PropTypes.string,
  modifiers: PropTypes.arrayOf(PropTypes.oneOf(mods)),
  isTitleH1: PropTypes.bool,
  showSoonLabelText: PropTypes.string,
  containerClassName: PropTypes.string,
  hasSectionButtonsGroup: PropTypes.bool,
}

Section.defaultProps = {
  title: '',
  icon: '',
  iconSize: '',
  iconType: '',
  subtitle: '',
  id: '',
  modifiers: [],
  linkText: '',
  linkHandler: () => {},
  linkIcon: '',
  className: '',
  isTitleH1: false,
  showSoonLabelText: '',
  containerClassName: '',
  hasSectionButtonsGroup: false,
}

export default Section
