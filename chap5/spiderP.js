import { promises as fsPromises } from 'fs'
import { dirname } from 'path'
import superagent from 'superagent'
import mkdirp from 'mkdirp'
import { urlToFilename, getPageLinks } from '../chap4/utils.js'
import { promisify } from 'util'

const mkdirpPromises = promisify(mkdirp)

function download(url, filename) {
  console.log(`Downloading ${url}`)
  let content
  return superagent.get(url)
    .then((res) => {
      content = res.text
      return mkdirpPromises(dirname(filename))
    })
    .then(() => fsPromises.writeFile(filename, content))
    .then(() => {
      console.log(`Downloaded and saved: ${url}`)
      return content
    })
}