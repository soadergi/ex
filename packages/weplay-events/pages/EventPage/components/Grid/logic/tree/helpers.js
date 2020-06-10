export function convertMatchNodeForList(node) {
  return {
    id: node.id,
    order: node.order,
    parentId: node.parent ? node.parent.id : null,
    hidden: node.hidden,
    pos: node.pos,
  }
}

export function convertTreeToArray(node) {
  const list = []

  const traverseTree = (children) => {
    children.forEach((child) => {
      list.push(convertMatchNodeForList(child))
      traverseTree(child.children)
    })
  }

  list.push(convertMatchNodeForList(node))
  traverseTree(node.children)

  return list
}

export function findNode(root, nodeId) {
  let found = null

  const traverseTree = (children) => {
    children.forEach((child) => {
      if (child.id === nodeId) {
        found = child
        return
      }

      traverseTree(child.children)
    })
  }

  if (root.id === nodeId) {
    found = root
  }

  traverseTree(root.children)

  return found
}
