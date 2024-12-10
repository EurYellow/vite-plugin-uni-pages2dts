import { Plugin } from 'vite';

type ConfigSource = string;
interface Options {
    /**
     * Generate TypeScript declaration for pages path
     *
     * Accept boolean or a path related to project root
     *
     * @default true
     */
    dts?: boolean | string;
    /**
     * Load from configs files
     *
     * @default 'pages.config.json',
     */
    configSource: ConfigSource;
    /**
     * pages.json dir
     * @default "src"
     */
    outDir: string;
    /**
     * all root directories loaded by subPackages
     * @default []
     */
    subPackages: string[];
}
type UserOptions = Partial<Options>;

declare function vitePluginTemplate(userOptions?: UserOptions): Plugin;

export { vitePluginTemplate as default };
