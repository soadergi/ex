import { useMemo } from 'react'

import { useParams } from 'weplay-singleton/RouterProvider/useParams'

export const useCategoryPageTabs = (categoryTabs) => {
  const { tab } = useParams()

  return useMemo(() => (categoryTabs
    ? categoryTabs.find(categoryTab => categoryTab.path === tab) ?? categoryTabs[0]
    : null),
  [categoryTabs, tab])
}
