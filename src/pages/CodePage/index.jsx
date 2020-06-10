/* eslint-disable max-lines */
// TODO: events team please fix this
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavHashLink as NavLink } from 'react-router-hash-link'

import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
// Not needed for forge of masters
// import { promoCodesActivationDates } from 'constants/promoCodes'
import { goTo, NAMES } from 'weplay-core/routes'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import Link from 'weplay-components/Link'
import HrefLangLink from 'weplay-components/HrefLangLink'
import Icon from 'weplay-components/Icon'
import PageHelmet from 'weplay-components/PageHelmet'

import { ARTIFACT_PROMO_AGILITY } from 'weplay-events/constants/signUpSources'
import CodePagePromoCodeForm from 'weplay-events/components/PromoCodeForm/CodePagePromoCodeForm'

import './code-page.scss'
import codeBannerLabel from './img/acer-nitro.png'
import imageUrl from './img/prizes_3.png'
import InformBlock from './InformBlock'
import RulesBlock from './RulesBlock'
import PrizesList from './PrizesList'
import StockBanner from './StockBanner'
import { prizeItemsList } from './prizeItemsList'
import container from './container'
import styles from './styles.scss'

const IS_ENDED = false
class CodePage extends Component {
  componentDidMount() {
    this.props.getPromoCodesCount({
      activatedDateFrom: '2019-04-08 14:15:00',
      activatedDateTo: '2019-04-16 23:59:59',
    })
  }

  componentWillUnmount() {
    this.props.triggerPromoCodesModal(false)
  }

    goToProfile = () => {
      const { history } = this.props
      goTo({
        name: NAMES.PROFILE,
        history,
      })
    }

  // TODO: move all handlers to the container
  // TODO: Check eslint problems on lines with disable comments
  handleClick = () => {
    const {
      currentUser,
      openLoginModal,
      logAnalytics,
      startcasePageName,
    } = this.props
    if (!currentUser) {
      openLoginModal()
    } else {
      this.goToProfile()
    }
    logAnalytics({
      eventCategory: `${startcasePageName} landing click`,
      eventAction: 'History of your codes',
    })
  }

  render() {
    const {
      i18nTexts,
      promocodesCount,
      events,
      eventType,
      ctaClickHandler,
      rulesClickHandler,
      agreementClickHandler,
      allRulesClickHandler,
      currentUser,
      ctaUrls,
      currentLanguage,
      seoInfo,
      ogImage,
      backgroundImageStyle,
    } = this.props

    return (
      <>
        <PageHelmet
          ogImage={ogImage}
          seoInfo={seoInfo}
        />
        <HrefLangLink pathname="/codes" />

        <div
          className={styles.topScreen}
          style={backgroundImageStyle}
          data-qa-id={dataQaIds.pages[NAMES.CODES].container}
        >
          <div className={styles.content}>
            <div className="c-code-data">
              <ContentContainer>
                <div className="u-mb-md-4 u-mb-6">
                  <p className="c-code-data__subtitle">
                    {promocodesCount}
                    {' '}
                    {i18nTexts.promocodes[eventType].subTitleFirst}
                  </p>

                  <h1 className="c-code-data__title">{i18nTexts.promocodes[eventType].titleFirst}</h1>

                  <CodePagePromoCodeForm
                    // TODO: @html team, maybe we can remove this and make some wrapper working in both cases
                    isCodesPage
                    registrationSource={ARTIFACT_PROMO_AGILITY}
                    // TODO @artem think about getting active stage from tournament
                    readOnly={IS_ENDED}
                  />

                  { !currentUser && (
                  <span className="c-code-data__time">
                    {i18nTexts.promocodes[eventType].RegisterToStart}
                  </span>
                  )}
                </div>
              </ContentContainer>
              <ContentContainer>
                <div className="c-code-data__bottom">
                  <nav className="c-code-data__nav">
                    <a
                      className="c-code-data__nav-link"
                      onClick={this.handleClick}
                    >
                      {i18nTexts.promocodes[eventType].yourCodes}
                    </a>
                    <a
                      href={events[eventType].rulesUrls}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="c-code-data__nav-link"
                      onClick={rulesClickHandler}
                    >
                      {i18nTexts.promocodes[eventType].rules}
                    </a>
                    <a
                      href={events[eventType].userAgreementUrls}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="c-code-data__nav-link"
                      onClick={agreementClickHandler}
                    >
                      {i18nTexts.promocodes[eventType].userAgreement}
                    </a>
                  </nav>
                  {eventType === 'strength' && (
                    <div className="c-code-data__label">
                      <NavLink
                        to="#scroll-to-banner"
                        scroll={(el) => {
                          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }}
                        className="c-code-data__label-text"
                      >
                        {i18nTexts.promocodes[eventType].labelText}
                      </NavLink>
                      <img
                        src={codeBannerLabel}
                        alt=""
                        className="c-code-data__decor"
                      />
                    </div>
                  )}
                </div>
              </ContentContainer>
            </div>
          </div>
        </div>

        <RulesBlock
          eventType={eventType}
          events={events}
          buttonHref={events[eventType].userAgreementUrls}
          buttonClick={allRulesClickHandler}
        />

        <StockBanner
          bannerTitleOne={i18nTexts.promocodes[eventType].bannerTitleOne}
          bannerTitleTwo={i18nTexts.promocodes[eventType].bannerTitleTwo}
          title={i18nTexts.promocodes[eventType].aser}
          description={i18nTexts.promocodes[eventType].bannerSubTitle}
          subTitle={i18nTexts.promocodes[eventType].description}
          imageUrl={imageUrl}
          alt="predator laptop"
          bannerTitleThree={i18nTexts.promocodes[eventType].bannerTitleThree}
          bannerTitleFour={i18nTexts.promocodes[eventType].bannerTitleFour}
        />

        <InformBlock
          subTitle={i18nTexts.promocodes[eventType].infoSubTitle}
          title={i18nTexts.promocodes[eventType].infoTitle}
          description={i18nTexts.promocodes[eventType].infoText}
        />

        <PrizesList
          prizesList={prizeItemsList[currentLanguage][eventType]}
        />

        <InformBlock
          subTitle={i18nTexts.promocodes[eventType].infoSecondSubTitle}
          title={i18nTexts.promocodes[eventType].infoSecondTitle}
          description={i18nTexts.promocodes[eventType].infoSecondText}
        >
          <Link
            to={ctaUrls[eventType]} /* TODO: need to refactor for future use */
            onClick={ctaClickHandler}
            className={styles.button}
          >
            <Icon
              iconName="play-sm"
              className={styles.icon}
              size="small"
            />
            <span className={styles.text}>{i18nTexts.promocodes[eventType].infoSecondBtn}</span>
          </Link>
        </InformBlock>
      </>
    )
  }
}

CodePage.propTypes = {
  // required props
  i18nTexts: PropTypes.shape({}).isRequired,
  openLoginModal: PropTypes.func.isRequired,
  promocodesCount: PropTypes.string.isRequired,
  getPromoCodesCount: PropTypes.func.isRequired,
  triggerPromoCodesModal: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
  events: PropTypes.shape({
    artifact: PropTypes.shape({
      leftImage: PropTypes.string.isRequired,
    }),
    winterMadness: PropTypes.shape({
      leftImage: PropTypes.string.isRequired,
    }),
  }).isRequired,
  eventType: PropTypes.string.isRequired,
  ctaUrls: PropTypes.shape({
    strength: PropTypes.string.isRequired,
    agility: PropTypes.string.isRequired,
    intelligence: PropTypes.string.isRequired,
    winterMadness: PropTypes.string.isRequired,
  }).isRequired,
  logAnalytics: PropTypes.func.isRequired,
  startcasePageName: PropTypes.string.isRequired,
  ctaClickHandler: PropTypes.func.isRequired,
  rulesClickHandler: PropTypes.func.isRequired,
  agreementClickHandler: PropTypes.func.isRequired,
  allRulesClickHandler: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({}),
  currentLanguage: PropTypes.string.isRequired,
  seoInfo: PropTypes.shape({}).isRequired,
  ogImage: PropTypes.string.isRequired,
  backgroundImageStyle: PropTypes.shape({
    backgroundImage: PropTypes.string.isRequired,
  }).isRequired,
}

CodePage.defaultProps = {
  currentUser: null,
}

export default container(CodePage)
