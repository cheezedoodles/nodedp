import { Writable } from 'stream'
import { mkdir, promises as fs } from 'fs'
import { dirname } from 'path'
import mkdirp from 'mkdirp'
import { promisify } from 'util'

const mkdirpPromise = promisify(mkdirp)

export class toFileStream extends Writable {
  constructor(options) {
    super({...options, objectMode: true})
  }

  _write(chunk, encoding, cb) {
    mkdirpPromise(dirname(chunk.path))
      .then(() => fs.writeFile(chunk.path, chunk.content))
      .then(() => cb())
      .catch(cb)
  }
}