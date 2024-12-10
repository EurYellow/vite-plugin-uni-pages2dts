import type { LoadConfigSource } from 'unconfig'
import type { GlobalStyle, PagesConfig } from './config'

export type ConfigSource = string

export interface Options {
  /**
   * Generate TypeScript declaration for pages path
   *
   * Accept boolean or a path related to project root
   *
   * @default true
   */
  dts?: boolean | string

  /**
   * Load from configs files
   *
   * @default 'pages.config.json',
   */
  configSource: ConfigSource

  /**
   * pages.json dir
   * @default "src"
   */
  outDir: string

  /**
   * all root directories loaded by subPackages
   * @default []
   */
  subPackages: string[]
}

export type UserOptions = Partial<Options>

export interface ResolvedOptions extends Omit<Options, 'dir' | 'homePage' | 'configSource' | 'dts' | 'subPackages'> {
  /**
   * Resolves to the `root` value from Vite config.
   * @default 'src'
   */
  outDir: string

  dts: string | false

  configSource: LoadConfigSource<PagesConfig>[]
}

export interface PagePath {
  relativePath: string
  absolutePath: string
}
export interface PageMetaDatum {
  /**
   * 配置页面路径
   */
  path: string
  type?: string
  /**
   * 配置页面窗口表现，配置项参考下方 pageStyle
   */
  style?: GlobalStyle
  /**
   * 当前页面是否需要登录才可以访问，此配置优先级高于 uniIdRouter 下的 needLogin
   */
  needLogin?: boolean
  [x: string]: any
}

export interface SubPageMetaDatum {
  root: string
  pages: PageMetaDatum[]
}
