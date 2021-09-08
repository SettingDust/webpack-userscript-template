import metadata from '../monkey.config'

const paddingLength = 1 + Object.keys(metadata).reduce((prev, curr) => (curr.length > prev ? curr.length : prev), 0)

const prefix = (arr: string[]): string[] => {
  const newArr = arr.map((it) => `// ${it}`)
  newArr.push('')
  return newArr
}

const wrapMeta = (arr: string[]): string[] => arr.map((it) => (it.length ? `@${it}` : it))

const sign = (arr: string[]): string[] => {
  arr.push('==/UserScript==')
  return ['==UserScript=='].concat(arr)
}

export default (dev: boolean = false): string => {
  const metas: string[] = []
  if (dev) {
    if (!metadata.require) metadata.require = []
    metadata.require.push('file://' + __dirname + '\\build\\' + metadata.name.toLowerCase().replace(' ', '-') + '.user.js')
  }
  for (const [key, value] of Object.entries(metadata)) {
    if (Array.isArray(value) && value.length) {
      metas.push('')
      for (const element of value) metas.push(key.padEnd(paddingLength) + element)
    } else metas.push(key.padEnd(paddingLength) + value)
  }
  return prefix(sign(wrapMeta(metas))).join('\n')
}
