import pipe from './pipe'

describe('pipe', () => {
  it('returns correct value', () => {
    const add1 = x => x + 1
    const multiply2 = x => x * 2
    const minus2 = x => x - 2

    expect(
      pipe(add1, multiply2, minus2)(9),
    ).toBe(18)

    expect(
      pipe([add1, multiply2, minus2])(9),
    ).toBe(18)
  })
})
