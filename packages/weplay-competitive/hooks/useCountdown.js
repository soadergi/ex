import {
  useState, useEffect, useCallback,
} from 'react'

import useMoment from 'weplay-core/hooks/useMoment'
import { usePrevious } from 'weplay-core/hooks/usePrevious'

const oneSecondMS = 1000
export const useCountdown = (finalTime) => {
  const { moment } = useMoment()

  const prevFinalTime = usePrevious(finalTime)
  const defaultCountdownState = {
    days: '',
    hours: '',
    minutes: '',
    seconds: '',
    secondsTotal: 0,
    isPassed: true,
  }
  const [countdown, setCountdown] = useState(defaultCountdownState)

  // eslint-disable-next-line no-magic-numbers
  const padDigit = num => (num < 10 ? '0' : '') + num

  const diffNowDuration = useCallback(
    finalMomentMs => moment.duration(finalMomentMs - moment.now()),
    [moment],
  )

  const getNowState = () => {
    const finalMomentMs = moment(finalTime).valueOf()
    const duration = diffNowDuration(finalMomentMs)

    return {
      days: String(duration.days()),
      hours: padDigit(duration.hours()),
      minutes: padDigit(duration.minutes()),
      seconds: padDigit(duration.seconds()),
      secondsTotal: duration.asSeconds(),
      isPassed: duration.asMilliseconds() < 0,
    }
  }

  let intervalId

  useEffect(() => {
    if (finalTime && moment) {
      if (!moment(prevFinalTime).isSame(finalTime)) {
        setCountdown(getNowState())
      }
      intervalId = setInterval(() => {
        setCountdown(getNowState())
      }, oneSecondMS)
    } else {
      clearInterval(intervalId)
    }
    return () => clearInterval(intervalId)
  }, [finalTime, moment])

  return { ...countdown }
}
