import fs from 'fs'

export function checkPagesJsonFile(path: string) {
    console.log(path)
    if (!fs.existsSync(path)) {
        writeFileSync(path, JSON.stringify({ pages: [{ path: '' }] }, null, 2))
        return false
    }
    return true
}
export function writeFileSync(path: string, content: string) {
    fs.writeFileSync(path, content, { encoding: 'utf-8' })
}
