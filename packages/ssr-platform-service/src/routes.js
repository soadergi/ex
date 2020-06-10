export const ROUTE_NAMES = {
  ROOT: 'ROOT',
  ARTICLE: 'ARTICLE',
}

export const ROUTES = [
  {
    name: ROUTE_NAMES.ROOT,
    path: '',
    lokaliseKey: 'root',
    project: 'home',
  },
  {
    name: ROUTE_NAMES.ARTICLE,
    path: 'blog/article/*-:articleId',
    project: 'blog',
    // dynamic page, no lokaliseKey
  },

]
export const getProjectPrefix = () => ''
