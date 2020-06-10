import { useContext } from 'react'

import { routesContext } from './routesContext'

export const useRoutes = () => useContext(routesContext)
