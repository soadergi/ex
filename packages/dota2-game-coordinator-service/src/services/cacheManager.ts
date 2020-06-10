class CacheManager {
  private cache = {}

  public async addCache<T>(key: string, value: T): Promise<void> {
    this.cache[key] = value
  }

  public async isCached(key) {
    return key in this.cache
  }

  public async removeCache(key) {
    const isCached = this.isCached(key)
    if (isCached) {
      delete this.cache[key]
    } else {
      console.warn('removeCache called wrong')
    }
  }

  public async getCache(key) {
    const isCached = this.isCached(key)
    if (isCached) {
      return this.cache[key]
    }
    console.warn('getCache called wrong')
    return null
  }
}

export const cacheManager = new CacheManager()
