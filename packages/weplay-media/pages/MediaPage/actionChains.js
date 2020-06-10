import { getSections } from 'weplay-core/reduxs/sections/actions'

export const getInitialData = ({
  locale,
}) => (dispatch, getState) => getSections.request({ language: locale })(dispatch, getState)
