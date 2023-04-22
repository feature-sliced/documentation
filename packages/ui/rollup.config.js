import { defineConfig } from 'rollup'
import typescriptPlugin from '@rollup/plugin-typescript'
import typescriptDtsPlugin from 'rollup-plugin-dts'
import { readPackageUpSync } from 'read-pkg-up'
import urlPlugin from '@rollup/plugin-url'

const packageJson = readPackageUpSync({ normalize: true }).packageJson

export default defineConfig([{
  input: 'src/index.ts',
  plugins: [
    typescriptPlugin(),
    urlPlugin({
      limit: 2000,
    }),
  ],
  output: [{
    file: 'dist/index.js',
    format: 'esm',
  }],
  external: [
    ...Object.keys(packageJson.devDependencies ?? {}),
    ...Object.keys(packageJson.dependencies ?? {}),
    ...Object.keys(packageJson.peerDependencies ?? {}),
  ],
}, {
  input: 'src/index.ts',
  plugins: [
    typescriptPlugin(),
    urlPlugin({
      limit: 2000,
    }),
    typescriptDtsPlugin(),
  ],
  output: {
    file: 'dist/index.d.ts',
    format: 'es',
  },
  external: [
    ...Object.keys(packageJson.devDependencies ?? {}),
    ...Object.keys(packageJson.dependencies ?? {}),
    ...Object.keys(packageJson.peerDependencies ?? {}),
  ],
}])
