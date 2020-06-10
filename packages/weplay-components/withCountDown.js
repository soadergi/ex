import * as R from 'ramda'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import withMoment from 'weplay-core/HOCs/withMoment'

// TODO: add support for isActive flag to switch on
const withCountDown = ({
  countdownTimePath,
}) => (WrappedComponent) => {
  const getFinalTime = R.path(countdownTimePath)
  const HOC = class extends PureComponent {
    constructor(props) {
      super(props)
      this.state = this.getNowState()
    }

    componentDidMount() {
      this.intervalId = setInterval(() => {
        this.setState(this.getNowState())
      }, 1000)
    }
    //
    // componentDidUpdate(prevProps) {
    //   if (getFinalTime(this.props) !== getFinalTime(prevProps)) {
    //     clearInterval(this.intervalId)
    //     this.intervalId = setInterval(() => {
    //       this.setState(this.getNowState())
    //     }, 1000)
    //   }
    // }

    componentWillUnmount() {
      clearInterval(this.intervalId)
    }

    getNowState = () => {
      const finalTime = getFinalTime(this.props)

      if (R.isNil(finalTime)) {
        return {
          days: '0',
          hours: '00',
          minutes: '00',
          seconds: '00',
          // time is null - countdown is passed
          // time is undefined - data for countdown is not loaded yet - so it is inProgress by
          // default
          isPassed: finalTime === null,
        }
      }

      const finalMomentMs = this.props.moment(finalTime).valueOf()
      const duration = this.diffNowDuration(finalMomentMs)
      return {
        days: String(duration.days()),
        hours: this.padDigit(duration.hours()),
        minutes: this.padDigit(duration.minutes()),
        seconds: this.padDigit(duration.seconds()),
        isPassed: duration.asMilliseconds() < 0,
      }
    };

    padDigit = (num) => {
      const twoLastSymbols = -2
      return (`0${num}`).slice(twoLastSymbols)
    }

    diffNowDuration = finalMomentMs => this.props.moment.duration(finalMomentMs - this.props.moment.now());

    render() {
      return (
        <WrappedComponent
          {...this.props}
          countdown={this.state}
        />
      )
    }
  }

  HOC.propTypes = {
    moment: PropTypes.func.isRequired,
  }
  return withMoment(HOC)
}

export default withCountDown
