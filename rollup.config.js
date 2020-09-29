// @ts-check
import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import nodePolyfills from 'rollup-plugin-node-polyfills'
import alias from '@rollup/plugin-alias'
import inject from '@rollup/plugin-inject'
import path from 'path'
/** @typedef {import("rollup").RollupOptions} RollupOptions */
/** @typedef {import("rollup").Plugin} RollupPlugin */

/** @type {() => RollupPlugin} */
function fixForGoogleAppsScript() {
  return {
    // this name will show up in warnings and errors:
    name: 'google-apps-script',
    // we want to expose all exported items as functions in global scope
    renderChunk: (code, chunk, options) => {
      /** @type {(exportName: string) => string} */
      const mapExport = (exportName) => `function ${exportName}(...args) {
  return ${options.name}.${exportName}(...args);
}`

      return `${code}
${chunk.exports.map(mapExport).join('\n')}
`
    },
  }
}

const emptyAdapterPath = path.resolve(
  __dirname,
  'src/google-apps-interop/emptyAdapter.js',
)

/** @type {RollupOptions} */
const config = {
  input: 'src/index.ts',
  output: {
    name: '__main',
    format: 'iife',
    file: 'build/script.js',
  },
  plugins: [
    alias({
      entries: [
        // we don't need the 'axios/lib/adapters' because they're for Node and Browsers
        // but we're running in a Google Apps Script engine
        {
          find: './adapters/xhr',
          replacement: emptyAdapterPath,
        },
        {
          find: './adapters/http',
          replacement: emptyAdapterPath,
        },
      ],
    }),
    inject({
      Buffer: ['buffer', 'Buffer'],
    }),
    // @ts-ignore upstream issue:
    nodePolyfills(),
    commonjs({ transformMixedEsModules: true }),
    resolve({ browser: true, preferBuiltins: false }),
    json(),
    typescript(),
    fixForGoogleAppsScript(),
  ],
}

export default config
