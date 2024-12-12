import type { PageContext } from './context'
import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile as writeFile_ } from 'node:fs/promises'
import { dirname } from 'node:path'

export async function writeDeclaration(ctx: PageContext, filepath: string) {
  const originalContent = existsSync(filepath) ? await readFile(filepath, 'utf-8') : ''

  const code = getDeclaration(ctx)
  if (!code)
    return

  if (code !== originalContent) {
    await writeFile(filepath, code)
  }
}
export function getDeclaration(ctx: PageContext) {
  // const subPagesPath =  ctx.subPageMetaData.map((sub) => sub.pages.map(v => (`"/${normalizePath(join(sub.root, v.path))}"`))).flat()

  const subPagesPath = []
  const tabsPagesPath = ctx.pagesGlobConfig?.tabBar?.list?.map(v => `"/${v!.pagePath}"`) ?? []
  const allPagesPath = [...ctx.pageMetaData.filter(page => !tabsPagesPath.includes(page.path)).map(v => `"/${v.path}"`), ...subPagesPath]
  const code = `/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by vite-plugin-uni-pages

interface NavigateToOptions {
  url: ${allPagesPath.join(' |\n       ')};
}
interface RedirectToOptions extends NavigateToOptions {}

interface SwitchTabOptions {
  ${tabsPagesPath.length ? `url: ${tabsPagesPath.join(' | ')}` : ''}
}

type ReLaunchOptions = NavigateToOptions | SwitchTabOptions;

declare interface Uni {
  navigateTo(options: UniNamespace.NavigateToOptions & NavigateToOptions): void;
  redirectTo(options: UniNamespace.RedirectToOptions & RedirectToOptions): void;
  switchTab(options: UniNamespace.SwitchTabOptions & SwitchTabOptions): void;
  reLaunch(options: UniNamespace.ReLaunchOptions & ReLaunchOptions): void;
}
`
  return code
}

async function writeFile(filePath: string, content: string) {
  await mkdir(dirname(filePath), { recursive: true })
  return await writeFile_(filePath, content, 'utf-8')
}
