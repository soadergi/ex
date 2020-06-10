import { useEffect, useState } from 'react'

import useMoment from 'weplay-core/hooks/useMoment'

const useTimer = (dateTime, isCountDown = false) => {
  const { moment } = useMoment()
  const initialTimer = {
    days: '',
    hours: '',
    minutes: '',
    seconds: '',
    isActiveTimer: false,
  }
  const calculateTimer = () => {
    const difference = isCountDown
      ? moment(dateTime).diff(moment())
      : moment().diff(moment(dateTime).valueOf())
    const duration = moment.duration(difference)
    const isActiveTimer = duration.asMilliseconds() >= 0
    if (!isActiveTimer) {
      return initialTimer
    }

    const padDigit = num => (num < 10 ? '0' : '') + num // eslint-disable-line no-magic-numbers

    return {
      days: String(duration.days()),
      hours: padDigit(duration.hours()),
      minutes: padDigit(duration.minutes()),
      seconds: padDigit(duration.seconds()),
      secondsTotal: duration.asSeconds(),
      isActiveTimer,
    }
  }

  const [timer, setTimer] = useState(initialTimer)
  let intervalId
  useEffect(() => {
    if (dateTime && moment) {
      intervalId = setInterval(() => {
        setTimer(calculateTimer())
      }, 1000)
    } else {
      clearInterval(intervalId)
    }
    return () => clearInterval(intervalId)
  }, [dateTime, moment])

  return ({ ...timer })
}

export default useTimer
