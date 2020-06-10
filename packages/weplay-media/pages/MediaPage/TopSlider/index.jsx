import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import SlickSlider from 'weplay-components/Slider/loadable'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'

import styles from './styles.scss'
import container from './container'
import TopSliderNewspaper from './TopSliderNewspaper'
import TopSliderSpecial from './TopSliderSpecial'
import Arrow from './Arrow'

const TopSlider = ({
  entities,
  topSliderConfig,
  isAutoplay,
  progressBarStyle,
  stopSliderAutoplay,
  stopSliderAutoplayDeferred,
  createSlideClickHandler,
  createArrowClickHandler,
}) => (
  <div
    className={classNames(styles.slider, styles.sliderMedia)}
  >
    <ContentContainer>
      <div
        className={styles.sliderContainer}
      >
        <div
          className={styles.sliderWrapper}
        >
          <SlickSlider
            {...topSliderConfig}
            autoplay={isAutoplay}
            prevArrow={(
              <Arrow
                onUserInteraction={createArrowClickHandler('left arrow')}
                isLeft
              />
          )}
            nextArrow={(
              <Arrow
                onUserInteraction={createArrowClickHandler('right arrow')}
              />
          )}
            customPaging={() => (
              <div
                className="slick-dots__button"
              >
                <span
                  className="slick-dots__progress"
                  style={progressBarStyle}
                />
              </div>
            )}
            onClick={stopSliderAutoplay}
            onSwipe={stopSliderAutoplayDeferred}
          >
            {
            entities.map((entity, index) => (
              <Fragment key={entity.id}>
                {entity.type === 'newsId' && (
                  <TopSliderNewspaper
                    newsId={entity.id}
                    slideIndex={index}
                    onClick={createSlideClickHandler(index)}
                  />
                )}

                {entity.type === 'specialTagTranslateId' && (
                  <TopSliderSpecial
                    specialProjectTranslateId={entity.id}
                    slideIndex={index}
                    onClick={createSlideClickHandler(index)}
                  />
                )}
              </Fragment>
            ))
          }
          </SlickSlider>
        </div>
      </div>
    </ContentContainer>
  </div>
)

TopSlider.propTypes = {
  entities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  topSliderConfig: PropTypes.shape().isRequired,
  isAutoplay: PropTypes.bool.isRequired,
  progressBarStyle: PropTypes.shape({}).isRequired,
  stopSliderAutoplay: PropTypes.func.isRequired,
  stopSliderAutoplayDeferred: PropTypes.func.isRequired,
  createSlideClickHandler: PropTypes.func.isRequired,
  createArrowClickHandler: PropTypes.func.isRequired,
}

export default container(TopSlider)
