export const getNewspaperCommentId = (item) => {
  const items = []
  items.push(item)
  if (item.childs.length) {
    item.childs.forEach((subItem) => {
      items.push(getNewspaperCommentId(subItem))
    })
  }
  return items
}
