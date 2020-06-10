const { addListener, removeListener, callListeners } = require('../dist/index')

describe('addListener and removeListener', () => {
  const listener = jest.fn()
  let key
  it('adds listener', async () => {
    key = addListener(listener)
    expect(key).toBeTruthy()
  })
  it('calls listener', async () => {
    const signal = 'SIGINT'
    await callListeners(signal)
    expect(listener).toBeCalledWith(signal)
    // TODO: trigger exit
  })
  it('removes listener', async () => {
    const isDeleted = await removeListener(key)
    expect(isDeleted).toBe(true)
    // TODO: trigger exit
  })
})
