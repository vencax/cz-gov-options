import { APIError } from './consts'

export default function setupErrHandlers (app) {
  
  app.use((error, req, res, next) => {
    if (error instanceof APIError) {
      return res.status(error.name).send(error.message)
    }
    if (error.data || error.table) {
      return res.status(400).send(error.message)
    }
    next(error)
  })

  app.use((error, req, res, next) => {
    console.error(error)
    res.status(500).send(error.message || error.toString())
  })

}