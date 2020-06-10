import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Masonry from 'react-masonry-component'
import classNames from 'classnames'

import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES } from 'weplay-core/routes'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import HrefLangLink from 'weplay-components/HrefLangLink'
import BottomArticles from 'weplay-components/BottomArticles'
import MediaPlayer from 'weplay-components/MediaPlayer'
import PageHelmet from 'weplay-components/PageHelmet'
import Section from 'weplay-components/_wrappers/Section'
import Image from 'weplay-components/Image'

import reshuffleIcon from './img/reshuffle-data-icon-2.png'
import reshuffleBg from './img/rsbg-light.jpg'
import reshuffleLogoText from './img/reshuffle-logo-text.svg'
import reshuffleLogo from './img/reshuffle-logo.png'
import allianceImg from './img/Alliance2016.png'
import teams from './teams'
import PromocodesBanner from './PromocodesBanner'
import container from './container'
import styles from './styles.scss'
import './reshuffle-card.scss'

const masonryOptions = {
  transitionDuration: 0,
}

class ReshuffleMadness2018Page extends Component {
  UNSAFE_componentWillMount() { // eslint-disable-line
    const { currentLanguage } = this.props
    this.fetchAcrticles(currentLanguage)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentLanguage !== this.props.currentLanguage) {
      this.fetchAcrticles(this.props.currentLanguage)
    }
  }

  fetchAcrticles = (locale) => {
    this.props.getArticles({
      params: {
        language: locale,
        tag: 1120,
        limit: 3,
        offset: 0,
        sort: '-published',
      },
    })
  }

  render() {
    const { i18nTexts, articlesCollection } = this.props
    // TODO: This flag needs to show 2 states of content inside `c-reshuffle-data`.
    // You are free to delete this flag if it's not needed
    const winnerFlag = true
    /* eslint-disable-next-line max-len */
    const ogImage = 'https://static-prod.weplay.tv/2018-09-21/72ce8dbc6bffc1c5d81ffacbddfda9be_large_cover.png'
    /* eslint-enable-next-line max-len */
    const childElements = teams.map(element => (
      <li
        className={styles['c-masonry-grid__item']}
        key={element.title}
        data-qa-id={dataQaIds.pages[NAMES.RESHUFFLE_MADNESS_2018].container}
      >
        <div className="c-reshuffle-card">
          <div className="c-reshuffle-card__container">
            <div className="c-reshuffle-card__header">
              <figure className="c-reshuffle-card__logo">
                <Image
                  src={element.src}
                  alt=""
                  className="c-reshuffle-card__img o-img-responsive"
                />
              </figure>

              <h3 className="c-reshuffle-card__title">{element.title}</h3>
            </div>

            <div className="c-reshuffle-card__body">
              <ul className="c-reshuffle-list">
                <li className="c-reshuffle-list__item">
                  <span className="c-reshuffle-list__label">{i18nTexts.reshuffle.gamer}</span>
                  <span className="c-reshuffle-list__label u-text-right">{i18nTexts.reshuffle.from}</span>
                </li>

                {element.team.map((player, index) => (
                  <li
                    className="c-reshuffle-list__item"
                    key={player.name}
                  >
                    <span className={`c-reshuffle-list__name ${index === 0 ? 'u-text-medium' : ''}`}>
                      {player.name}
                    </span>
                    <span className="c-reshuffle-list__status">{player.from}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </li>
    ))

    return (
      <>
        <PageHelmet ogImage={ogImage} />
        <div
          className={styles.topScreen}
          style={{ backgroundImage: `url(${reshuffleBg})` }}
        >
          <HrefLangLink pathname="/reshuffle" />
          <div className={styles.content}>
            <ContentContainer>
              <div className={styles.logo}>
                <div className={styles.icon}>
                  <Image
                    src={reshuffleLogo}
                    alt=""
                    className="o-img-responsive"
                  />
                </div>

                <Image
                  src={reshuffleLogoText}
                  alt=""
                  className={classNames(
                    styles.text,
                    'o-img-responsive',
                  )}
                />
              </div>
              <p className={classNames(styles.text,
                'u-mb-md-5',
                'u-mb-sm-6',
                'u-mb-5',
                'u-mx-auto')}
              >
                {i18nTexts.reshuffle.topLead}
                <span className={styles.date}>28/09 - 02/10</span>
              </p>
            </ContentContainer>

            <ContentContainer>
              <div className="c-reshuffle-data">
                <div className="c-reshuffle-data__column">
                  <p className={styles.label}>
                    {winnerFlag ? i18nTexts.reshuffle.topWinner : i18nTexts.reshuffle.topLabel}
                  </p>
                  <p className={styles.text}>
                    <span className={styles.description}>{winnerFlag ? 'Alliance' : '$50,000'}</span>
                  </p>
                </div>

                <div className={`c-reshuffle-data__icon ${winnerFlag ? 'c-reshuffle-data__icon--winner-bg' : ''}`}>
                  {winnerFlag
                    ? (
                      <div className="c-reshuffle-data__winner">
                        <Image
                          src={allianceImg}
                          alt=""
                          className="o-img-responsive"
                        />
                      </div>
                    )
                    : (
                      <Image
                        src={reshuffleIcon}
                        alt=""
                        className="c-reshuffle-data__icon-default"
                      />
                    )}
                </div>
              </div>
            </ContentContainer>
          </div>
        </div>

        <div className="u-py-2 u-py-md-4">
          <ContentContainer>
            <div className="u-mb-4">
              <MediaPlayer
                url="https://player.twitch.tv/weplaytv_en"
                linkToSource="https://player.twitch.tv"
              />
            </div>
            <PromocodesBanner i18n={i18nTexts} />

            <h2 className="c-h3 u-mb-4">{i18nTexts.reshuffle.teams}</h2>

            <Masonry
              className={styles['c-masonry-grid']} // default ''
              elementType="ul" // default 'div'
              options={masonryOptions} // default {}
              disableImagesLoaded={false} // default false
              updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
            >
              {childElements}
            </Masonry>
          </ContentContainer>

          <Section className="u-pt-sm-0 u-pt-2">
            <BottomArticles
              title={i18nTexts.text.reshuffleMadnessNews}
              linkUrl="/tags/reshuffle-1120"
              linkText={i18nTexts.text.allNews}
              articles={articlesCollection.all}
            />
          </Section>
        </div>
      </>
    )
  }
}

ReshuffleMadness2018Page.propTypes = {
  i18nTexts: PropTypes.shape({}).isRequired,
  articlesCollection: PropTypes.shape({
    all: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  getArticles: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string.isRequired,
}

export default container(ReshuffleMadness2018Page)
