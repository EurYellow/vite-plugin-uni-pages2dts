import fs from 'fs'

export function readFileSync(path: string) {
  try {
    return fs.readFileSync(path, { encoding: 'utf-8' })
  } catch {
    return ''
  }
}
