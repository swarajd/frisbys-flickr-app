export const compose  = (fn, ...rest) =>
  rest.length === 0 ?
    fn :
    (...args) => fn(compose(...rest)(...args));

export const prop = val => obj => 
    obj[val]

export const map = f => xs =>
    xs.map(f)
