import path from 'path'
import assert from 'assert'
import { open } from 'sqlite'
import sqlite3 from 'sqlite3'

const db = {}

async function initDB () {
  assert.ok(process.env.DATABASE_FILE, 'env.DATABASE_FILE not defined!')
  
  const db = await open({
    filename: process.env.DATABASE_FILE,
    driver: sqlite3.Database
  })

  await db.migrate({
    migrationsPath: path.join(__dirname, 'migrations')
  })

  return db
}

export const init = () => initDB().then(initialized => {
  db.conn = initialized
})

export default db