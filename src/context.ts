import type { PagesConfig } from './config'
import type { PageMetaDatum, PagePath, ResolvedOptions, SubPageMetaDatum, UserOptions } from './types'
import path from 'node:path'
import { loadConfig } from 'unconfig'
import { OUTPUT_NAME } from './constant'
import { writeDeclaration } from './declaration'
import { resolveOptions } from './options'
import { checkPagesJsonFile } from './utils'

export class PageContext {
  pagesGlobConfig: PagesConfig | undefined
  pagesConfigSourcePaths: string[] = []

  pagesPath: PagePath[] = []
  subPagesPath: Record<string, PagePath[]> = {}
  pageMetaData: PageMetaDatum[] = []
  subPageMetaData: SubPageMetaDatum[] = []

  resolvedPagesJSONPath = ''
  resolvedPagesJSONIndent = '  '
  resolvedPagesJSONNewline = '\n'
  resolvedPagesJSONEofNewline = true

  rawOptions: UserOptions
  root: string
  options: ResolvedOptions

  withUniPlatform = false

  constructor(userOptions: UserOptions, viteRoot: string) {
    this.rawOptions = userOptions
    this.root = viteRoot
    this.options = resolveOptions(userOptions, this.root)
    this.resolvedPagesJSONPath = path.join(this.root, this.options.outDir, OUTPUT_NAME)
  }

  async loadUserPagesConfig() {
    const configSource = this.options.configSource
    const { config, sources } = await loadConfig<PagesConfig>({ cwd: this.root, sources: configSource, defaults: {} })

    this.pagesGlobConfig = config
    this.pageMetaData = config.pages || []
    this.pagesConfigSourcePaths = sources
  }

  async updatePagesJSON(filepath?: string) {
    if (filepath) {
      // TODO: update pages.json file
    }
    if (!checkPagesJsonFile(this.resolvedPagesJSONPath)) {
      console.error('pages.json file is not found')
      throw new Error('pages.json file is not found')
    }
    await this.loadUserPagesConfig()
    this.generateDeclaration()
  }

  generateDeclaration() {
    if (!this.options.dts)
      return

    return writeDeclaration(this, this.options.dts)
  }
}
