import { promisify } from 'util'


export class Blog {
  constructor(db) {
    this.db = db
    this.dbRun = promisify(db.run.bind(db))
    this.dbAll = promisify(db.all.bind(db))
  }

  initialize() {
    const initQuery = `CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`

    return dbRun(initQuery)
  }

  createPost(id, title, content, created_at) {
    return dbRun('INSERT INTO posts VALUES (?, ?, ?, ?)',
      id, title, content, created_at
    )
  }

  getAllPosts() {
    return dbAll('SELECT * FROM posts ORDER BY created_at DESC')
  }
}
