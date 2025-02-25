export const combine = (obj, target, keys) => {
  const matches = Object.keys(obj).filter((key) => {
    return keys.find((query) => {
      return typeof query === 'string' ? key === query : query.test(key)
    })
  })
  const clone = { ...obj }
  for (const key of matches) {
    delete obj[key]
  }
  obj[target] = matches.reduce((acc, key) => {
    return acc + (clone[key] || 0)
  }, 0)
  if (obj[target] === 0) {
    delete obj[target]
  }
}

export const move = (from, to, key) => {
  to[key] = from[key]
  delete from[key]
}

export const clone = (obj) => JSON.parse(JSON.stringify(obj))
