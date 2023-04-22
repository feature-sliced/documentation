import { program } from 'commander'
import * as path from 'node:path'
import * as fsp from 'node:fs/promises'
import * as async from 'async'
import chokidar from 'chokidar'
import prexit from 'prexit'

const run = async () => {
  program.parse()

  const watchRoot = path.join(process.cwd(), program.args[0])

  const fsWatcher = chokidar.watch(watchRoot, {
    ignoreInitial: false,
  })

  fsWatcher.on('all', (event, p) => {
    console.log(path.relative(watchRoot, p))
  })

  return async () => {
    await fsWatcher.close()
  }
}

const stopFn = await run()
console.log('gqlss started')
prexit(async () => {
  await stopFn()
  console.log('gqlss stopped')
  process.exit(0)
})
