import { camelizeKeys } from '../../helpers'

class ArticlesCollection {
  constructor(collection) {
    this.all = collection ? collection.map(item => camelizeKeys(item)) : []
    this.first = (this.all[0] || {})
    this.second = (this.all[1] || {})
  }
}

export default ArticlesCollection
