import { EventEmitter } from "events"
import { readFile } from 'fs'
import { nextTick } from "process"


class FindRegex extends EventEmitter {
  constructor(regex) {
    super()
    this.regex = regex
    this.files = []
  }

  addFile(file) {
    this.files.push(file)
    return this
  }

  find() {
    for (const file of this.files) {
      nextTick(() => this.emit('process_start', this.files))
      readFile(file, 'utf8', (err, content) => {
        if (err) {
          return this.emit('error', err)
        }

        this.emit('fileread', file)

        const match = content.match(this.regex)
        if (match) {
          match.forEach(elem => this.emit('found', file, elem))
        }
      })
    }
    return this
  }
}

const emitter = new FindRegex(/hello \w+/)
emitter
  .addFile('file.txt')
  .find()
  .on('process_start', (list) => console.log(`list of files: ${list}`))
  .on('found', (file, match) => console.log(`${match} in file ${file}`))
  .on('error', (err) => console.log(err))