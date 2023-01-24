import { promisify } from 'util'
import { db } from './db.js'

const dbRun = promisify(db.run.bind(db))
const dbAll = promisify(db.all.bind(db))

export class Blog {}