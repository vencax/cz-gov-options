import express from 'express'
import setupErrHandlers from './error_handling.js'
import { init as inintDB } from './db'
import initApp from './index'

export async function init () {
  await inintDB()
  const app = express()

  initApp(app)
  setupErrHandlers(app)
  return app
}

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
init().then(app => {
  app.listen(port, host, (err) => {
    if (err) throw err
    console.log(`shitstorm started on ${host}:${port}`)
  })
}).catch(err => {
  console.error(err)
})
