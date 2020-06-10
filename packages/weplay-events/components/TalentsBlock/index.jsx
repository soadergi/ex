import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import SlickSlider from 'weplay-components/Slider/loadable' // eslint-disable-line
import Image from 'weplay-components/Image'

import TalentItem from './TalentItem'
import container from './container'
import styles from './styles.scss'

const TalentsBlock = ({
  // required props
  // container props
  background,
  carouselConfig,
  title,
  description,
  talents,
  activeSlide,
  // optional props
  mainFomLeague,
  className,
}) => (
  <div
    className={classNames(
      styles.block,
      className,
      { [styles.mainFomLeague]: mainFomLeague },
    )}
    data-event-position="Talent"
  >
    <div className={styles.wrap}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>

      {mainFomLeague ? (
        <ContentContainer>
          <div className={styles.wrapTalent}>
            {talents.map((talent, index) => (
              <TalentItem
                isActive={activeSlide === index}
                key={talent.id}
                talent={talent}
                mainFomLeague={mainFomLeague}
              />
            ))}
          </div>
        </ContentContainer>
      ) : (
        <SlickSlider
          {...carouselConfig}
        >
          {talents.map((talent, index) => (
            <TalentItem
              className={styles.talentItem}
              isActive={activeSlide === index}
              key={talent.id}
              talent={talent}
              mainFomLeague={mainFomLeague}
            />
          ))}
        </SlickSlider>
      )}
    </div>

    {background && (
      <Image
        className={styles.backgroundUrl}
        src={background}
        alt=""
      />
    )}
  </div>
)

TalentsBlock.propTypes = {
  // required props
  talents: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  // container props
  carouselConfig: PropTypes.shape({}).isRequired,
  activeSlide: PropTypes.number.isRequired,
  // optional props
  title: PropTypes.string,
  description: PropTypes.string,
  mainFomLeague: PropTypes.bool,
  background: PropTypes.string,
  className: PropTypes.string,
}

TalentsBlock.defaultProps = {
  // optional props
  title: '',
  description: '',
  background: '',
  className: '',
  mainFomLeague: false,
}

export default container(TalentsBlock)
