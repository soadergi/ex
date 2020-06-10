import { useContext } from 'react'

import { loaderContext } from './loaderContext'

export const useLoaderContext = () => useContext(loaderContext)
