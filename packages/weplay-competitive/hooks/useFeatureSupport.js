import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { featuresSelectors } from 'weplay-competitive/reduxs/features'

const useFeatureSupport = () => {
  const features = useSelector(featuresSelectors.allRecordsSelector)
  const isFeatureSupported = useCallback(
    name => features.some(feature => feature?.name === name && feature?.status === 'ENABLED'),
    [features],
  )
  return { isFeatureSupported }
}

export default useFeatureSupport
