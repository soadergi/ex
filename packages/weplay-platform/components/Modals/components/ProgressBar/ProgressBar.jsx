import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SvgIcon from 'weplay-components/SvgIcon'

import styles from './styles.scss'

const progressPercent = 0.7
const defaultStepsCount = 5
const index = 3
class ProgressBar extends Component {
  componentDidUpdate(prevProps) { // TODO we really need to think about how to refactor this sh*t
    const { step } = this.props
    if (prevProps.step !== step) {
      if ((prevProps.step === '' || prevProps.step === 'forgotPassStep2' || prevProps.step === 'changeEmailStep2')
          && (step === 'forgotPassStep1' || step === 'signUpStep1')) {
        if (this.progressBack && this.progressDots) {
          this.progressBack.removeAttribute('style')
          this.progressDots.querySelectorAll('.c-steps-progressbar__item')[0].classList.remove('is-pass')
          this.progressDots.querySelectorAll('.c-steps-progressbar__item')[1].classList.remove('is-round')
          this.progressDots.querySelectorAll('.c-steps-progressbar__item')[1].classList.remove('is-pass')
        }
      } else {
        import('gsap').then(({
          TimelineLite,
          Power1,
        }) => {
          if (
            step === 'forgotPassStep2'
            || step === 'signUpStep2'
            || step === 'changeEmailStep2'
          ) {
            new TimelineLite()
              .set(this.progressDots.querySelectorAll('.c-steps-progressbar__item')[0], {
                className: '+=is-pass',
              })
              .set(this.progressDots.querySelectorAll('.c-steps-progressbar__item')[2], {
                className: 'c-steps-progressbar__item',
              })
              .to(this.progressBack, progressPercent, {
                width: `${prevProps.stepsCount === defaultStepsCount ? '25%' : '50%'}`,
                ease: Power1.easeInOut,
              })
              .set(this.progressDots.querySelectorAll('.c-steps-progressbar__item')[1], {
                className: '+=is-round',
              }, '+=0.3')
          } else if (
            step === 'forgotPassStep3'
            || step === 'signUpStep3'
            || step === 'changeEmailStep3'
          ) {
            const timeLineStepThree = new TimelineLite()
            timeLineStepThree
              .set(this.progressDots.querySelectorAll('.c-steps-progressbar__item')[1], {
                className: '+=is-pass',
              })
              .to(this.progressBack, progressPercent, {
                width: `${prevProps.stepsCount === defaultStepsCount ? '50%' : '100%'}`,
                ease: Power1.easeInOut,
              })
              .set(this.progressDots.querySelectorAll('.c-steps-progressbar__item')[2], {
                className: `${prevProps.stepsCount === defaultStepsCount ? '+=is-round' : 'c-steps-progressbar__item'}`,
              })
            if (step === 'changeEmailStep3') {
              timeLineStepThree.set(this.progressDots.querySelectorAll('.c-steps-progressbar__item')[index], {
                className: 'c-steps-progressbar__item',
              })
            }
          } else if (
            step === 'changeEmailStep4'
            && this.progressDots.querySelectorAll('.c-steps-progressbar__item')[index]
          ) {
            new TimelineLite()
              .set(this.progressDots.querySelectorAll('.c-steps-progressbar__item')[2], {
                className: '+=is-pass',
              })
              .to(this.progressBack, progressPercent, {
                width: '75%',
                ease: Power1.easeInOut,
              })
              .set(this.progressDots.querySelectorAll('.c-steps-progressbar__item')[index], {
                className: '+=is-round',
              })
          } else if (
            step === 'changeEmailStep5'
            && this.progressDots.querySelectorAll('.c-steps-progressbar__item')[index]
          ) {
            new TimelineLite().set(this.progressDots.querySelectorAll('.c-steps-progressbar__item')[index], {
              className: '+=is-pass',
            })
              .to(this.progressBack, progressPercent, {
                width: '100%',
                ease: Power1.easeInOut,
              })
          }
        })
      }
    }
  }

    isLastStep = step => step === 'forgotPassStep4' || step === 'signUpStep4' || step === 'changeEmailStep5'

    renderDots = () => {
      const { stepsCount, step } = this.props
      const dots = []
      if (stepsCount) {
        for (let i = 0; dots.length < stepsCount; i += 1) {
          if (i === stepsCount - 1) {
            dots.push(
              <span
                className="c-steps-progressbar__item"
                key={i}
              >
                <SvgIcon
                  iconName={`${this.isLastStep(step) ? 'color-fire' : 'fire'}`}
                  type={this.isLastStep(step) ? 'color' : ''}
                  className={styles.icon}
                />
              </span>,
            )
          } else {
            dots.push(<span
              key={i}
              className={`c-steps-progressbar__item ${i === 0 ? ' is-round' : ''}`}
            />)
          }
        }
      }

      return dots
    }

    render() {
      const { step } = this.props
      return (
        <>
          {step !== ''
            ? (
              <div className="c-steps-progressbar">
                <div
                  ref={(elem) => { this.progressBack = elem }}
                  className="c-steps-progressbar__back"
                />
                <div
                  ref={(elem) => { this.progressDots = elem }}
                  className="c-steps-progressbar__body"
                >
                  {this.renderDots()}
                </div>
              </div>
            )
            : null}
        </>

      )
    }
}

ProgressBar.propTypes = {
  step: PropTypes.string.isRequired,
  stepsCount: PropTypes.number,
}

ProgressBar.defaultProps = {
  // optional props
  stepsCount: 3,
}

export default ProgressBar
