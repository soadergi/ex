import { useContext } from 'react'

import { RouterContext } from './routerContext'

export const useRouteContext = () => useContext(RouterContext)
