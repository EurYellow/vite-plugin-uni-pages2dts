import fs from 'node:fs'

export function checkPagesJsonFile(path: string) {
  if (!fs.existsSync(path)) {
    writeFileSync(path, JSON.stringify({ pages: [{ path: '' }] }, null, 2))
    return false
  }
  return true
}
export function writeFileSync(path: string, content: string) {
  fs.writeFileSync(path, content, { encoding: 'utf-8' })
}
