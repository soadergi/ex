// eslint-disable-next-line node/no-unpublished-require
const { someFn } = require('../dist/index') // eslint-disable-line no-undef

describe('someFn', () => {
  it('do smth good', async () => {
    expect(someFn()).toEqual()
  })
})
