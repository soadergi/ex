import { useState, useMemo } from 'react'

const collapsedListMinItemsAmount = 3

function useShowHideList(
  allList,
  minItemsAmount = collapsedListMinItemsAmount,
  isInitiallyOpened = false,
) {
  const [isOpened, setOpened] = useState(isInitiallyOpened)

  const list = useMemo(() => {
    if (isOpened || !allList?.length) {
      return allList
    }
    return allList.slice(0, minItemsAmount)
  }, [isOpened, allList, minItemsAmount])

  return [isOpened, setOpened, list]
}

export default useShowHideList
