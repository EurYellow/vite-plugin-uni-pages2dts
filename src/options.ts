import { resolve } from 'path'
import type { LoadConfigSource } from 'unconfig'
import type { PagesConfig } from './config'
import type { UserOptions } from './types'

export function resolveOptions(userOptions: UserOptions, viteRoot: string) {
  const { outDir = 'src', configSource = 'src/pages', dts = true } = userOptions

  const resolvedConfigSource = [{ files: configSource } as LoadConfigSource<PagesConfig>]
  const resolvedDts: string | false = !dts ? false : typeof dts === 'string' ? dts : resolve(viteRoot, 'uni-pages.d.ts')

  const resolvedOptions = {
    dts: resolvedDts,
    outDir,
    configSource: resolvedConfigSource,
    root: viteRoot,
  }
  console.log({ resolveOptions: resolvedOptions })
  return resolvedOptions
}
