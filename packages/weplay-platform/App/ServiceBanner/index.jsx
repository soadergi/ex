import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import ButtonClose from 'weplay-components/ButtonClose'

import container from './container'
import styles from './styles.scss'

const ServiceBanner = ({
  // props from container
  handleCloseBtnClick,
  message,
  link,
  buttonText,
  ticketsPageButtonText,
  bannerRef,
  isUserAdmin,
  isUserTicketsAdmin,
}) => (
  <div
    className={styles.block}
    ref={bannerRef}
  >
    <ContentContainer>
      <div className={styles.container}>
        <p className={styles.message}>{message}</p>
        {isUserAdmin && (
        <a
          href={link}
          target="_blank"
          rel="noreferrer noopener"
          className={styles.link}
        >
          {buttonText}
        </a>
        )}

        {isUserTicketsAdmin && (
        <a
          href="/ru/tickets"
          className={styles.link}
        >
          {ticketsPageButtonText}
        </a>
        )}

        {/* TODO: @Andrew, it has disabled in first iteration */}
        { false && (
        <ButtonClose
          onButtonClick={handleCloseBtnClick}
          className={styles.close}
        />
        )}
      </div>
    </ContentContainer>
  </div>
)

ServiceBanner.propTypes = {
  // required props
  // container props
  message: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  ticketsPageButtonText: PropTypes.string.isRequired,
  bannerRef: PropTypes.func.isRequired,
  isUserAdmin: PropTypes.bool.isRequired,
  isUserTicketsAdmin: PropTypes.bool.isRequired,
  // optional props
  handleCloseBtnClick: PropTypes.func,
}

ServiceBanner.defaultProps = {
  // optional props
  handleCloseBtnClick: R.always,
}

export default container(ServiceBanner)
