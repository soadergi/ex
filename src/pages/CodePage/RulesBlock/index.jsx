import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import styles from './styles.scss'
import container from './container'
import RulesList from './RulesList'

const RulesBlock = ({
  i18nTexts,
  eventType,
  buttonHref,
  buttonClick,
  leftImage,
}) => (
  <div className={classNames(
    styles.codeBanner,
    styles[eventType],
  )}
  >
    <div className={styles.wrapper}>
      <div className={styles.content}>

        {leftImage && (
          <span className={styles.imgWrapper}>
            <img
              className={styles.img}
              src={leftImage}
              alt="enigma"
            />
          </span>
        )}

        <p className={styles.title}>{i18nTexts.promocodes[eventType].title}</p>
        <p className={styles.subtitle}>{i18nTexts.promocodes[eventType].subText}</p>
        <RulesList
          rulesList={[
            {
              id: 0,
              index: '1',
              title: i18nTexts.promocodes[eventType].listItemOne,
              text: i18nTexts.promocodes[eventType].listItemOneText,
            },
            {
              id: 1,
              index: '2',
              title: i18nTexts.promocodes[eventType].listItemTwo,
              text: i18nTexts.promocodes[eventType].listItemTwoText,
            },
            {
              id: 2,
              index: '3',
              title: i18nTexts.promocodes[eventType].listItemThree,
              text: i18nTexts.promocodes[eventType].listItemThreeText,
              note: i18nTexts.promocodes[eventType].noteText,
            },
          ]}
        />
        <a
          href={buttonHref}
          target="_blank"
          rel="noopener noreferrer"
          className={classNames(
            'u-text-uppercase',
            styles.button,
          )}
          onClick={buttonClick}
        >
          <span className={styles.text}>{i18nTexts.promocodes[eventType].infoBtnText}</span>
        </a>
      </div>
    </div>
  </div>
)

RulesBlock.propTypes = {
  i18nTexts: PropTypes.shape({}).isRequired,
  eventType: PropTypes.string.isRequired,
  buttonHref: PropTypes.string.isRequired,
  buttonClick: PropTypes.func.isRequired,
  leftImage: PropTypes.string,
}

RulesBlock.defaultProps = {
  leftImage: '',
}

export default container(RulesBlock)
