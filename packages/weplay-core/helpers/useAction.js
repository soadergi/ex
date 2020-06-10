import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import { useMemo } from 'react'

export default (actions) => {
  const dispatch = useDispatch()
  return useMemo(() => bindActionCreators(actions, dispatch), [dispatch])
}
