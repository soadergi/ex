import { useEffect, useState } from 'react'

const useMoment = () => {
  const [moment, setMoment] = useState(false)
  useEffect(() => {
    import('moment')
      .then(importMoment => setMoment(importMoment))
  },
  [])

  if (moment) {
    return {
      moment: moment.default,
    }
  }
  return () => {}
}

export default useMoment
