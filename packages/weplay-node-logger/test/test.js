// eslint-disable-next-line node/no-unpublished-require
const { safeStringify } = require('../dist/index') // eslint-disable-line no-undef

describe('safeStringify', () => {
  it('dont fail with recursive', async () => {
    const recursive = {}

    recursive.recursive = recursive
    expect(safeStringify(recursive)).toEqual('cant stringify')
  })
})
