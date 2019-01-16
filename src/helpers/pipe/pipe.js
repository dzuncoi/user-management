// usage: compose functions left to right
// pipe(add1, multiply2, minus2)(9) === 18
// or
// pipe([add1, multiply2, minus2])(9) === 18

export default (fns, ...rest) => x => (Array.isArray(fns)
  ? fns.reduce((v, f) => f(v), x)
  : [fns, ...rest].reduce((v, f) => f(v), x))
