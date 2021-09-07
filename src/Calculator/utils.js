export const sum = (a, b) => parseFloat(a) + parseFloat(b)
export const dif = (a, b) => parseFloat(a) - parseFloat(b)
export const mul = (a, b) => parseFloat(a) * parseFloat(b)
export const div = (a, b) => parseFloat(a) / parseFloat(b)

export const moveArray = (obj) => {
  obj.push(obj.shift())
  return obj
}
