export const getNextHref = (pathname) => {
  if (pathname.includes('blog/article')) {
    const nameAndId = pathname.split('/').slice(-1)[0]
    return `/_dynamic-pages/article?nameAndId=${nameAndId}`
  }
  if (pathname.includes('projects/')) {
    const nameAndId = pathname.split('/').slice(-1)[0]
    return `/_dynamic-pages/project?nameAndId=${nameAndId}`
  }
  if (pathname.includes('team/')) {
    const memberName = pathname.split('/').slice(-1)[0]
    return `/_dynamic-pages/teamMember?memberName=${memberName}`
  }
  return pathname.replace('/ru', '')
}
