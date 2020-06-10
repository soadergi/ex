export const getNextHref = (pathname) => {
  if (pathname.includes('blog/article')) {
    const nameAndId = pathname.split('/').slice(-1)[0]
    return `/_dynamic-pages/article?nameAndId=${nameAndId}`
  }
  return pathname.replace('/ru', '')
}
