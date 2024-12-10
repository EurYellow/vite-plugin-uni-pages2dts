import { Plugin } from 'vite'
import type { UserOptions } from './types'
import { PageContext } from './context'

export default function vitePluginTemplate(userOptions: UserOptions = {}): Plugin {
  let ctx: PageContext

  return {
    name: 'vite-plugin-template',
    enforce: 'pre', // post
    apply: 'serve', // apply 亦可以是一个函数
    async configResolved(config) {
      ctx = new PageContext(userOptions, config.root)

      await ctx.updatePagesJSON()
    },
  }
}
