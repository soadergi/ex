import React from 'react'
import PropTypes from 'prop-types'
import SvgIcon from 'weplay-components/SvgIcon'
import Checkbox from 'weplay-components/Checkbox'
import Link from 'weplay-components/Link'
import Switcher from 'weplay-components/Switcher'

import styles from './styles.scss'
import container from './container'

const GeneralSubscription = ({
  // required props
  i18nTexts,
  isUserSubscribed,
  toggleCheckBox,
  toggleSubscription,
  // container props
  isChecked,
  linkUrl,
  isSubscriptionLoading,
  // optional props
}) => (
  <>
    <div
      className={styles.wrapper}
    >
      <SvgIcon
        iconName="email"
        type="color"
        className={styles.icon}
      />
      <div className={styles.block}>
        <div className={styles.description}>
          <span className={styles.title}>{i18nTexts.cabinet.generalSubscription.title}</span>
          <span className={styles.subTitle}>{i18nTexts.cabinet.generalSubscription.subTitle}</span>
        </div>
        <Switcher
          value={isUserSubscribed}
          onChange={toggleSubscription}
          disabled={(!isUserSubscribed && !isChecked) || isSubscriptionLoading}
        />
      </div>
    </div>
    <div className={styles.agreement}>
      {!isUserSubscribed && (
        <div className={styles.checkboxWrap}>
          <Checkbox
            id="profileSubscriptionAgreement"
            onChange={toggleCheckBox}
            value={isChecked}
          >
            <span className={styles.checkboxText}>{i18nTexts.cabinet.generalSubscription.checkboxLabel}</span>
          </Checkbox>
        </div>
      )}
      <Link
        to={linkUrl}
        className={styles.link}
      >
        {i18nTexts.cabinet.generalSubscription.link}
      </Link>
    </div>
  </>
)

GeneralSubscription.propTypes = {
  // required props
  i18nTexts: PropTypes.shape({}).isRequired,

  // container props
  isChecked: PropTypes.bool.isRequired,
  isUserSubscribed: PropTypes.bool.isRequired,
  toggleCheckBox: PropTypes.func.isRequired,
  toggleSubscription: PropTypes.func.isRequired,
  linkUrl: PropTypes.string.isRequired,
  isSubscriptionLoading: PropTypes.bool.isRequired,
  // optional props
}

GeneralSubscription.defaultProps = {
  // optional props
}

export default container(GeneralSubscription)
