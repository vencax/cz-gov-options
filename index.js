
import ARESRoutes from './api/ares/routes.js'

export default function init (app) {
  app.use('/ares', ARESRoutes)

  return app
}