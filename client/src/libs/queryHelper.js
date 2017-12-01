export function parameterize (obj, prefix) {
  let str = []

  for (let p in obj) {
    if (!obj.hasOwnProperty(p)) continue
    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
  }

  return str.join('&')
}
