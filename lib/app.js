const express = require('express')
const cors = require('cors')
const db = require('./db')

// create app
module.exports = app = express()

// init CORS
opts = {
  maxAge: 86400
}
app.use(cors(opts))

// setup api
function _createError(message, status) {
  return {status: status || 400, message}
}

app.get('/towns', (req, res, next) => {
  res.json(db.towns())
})

function _general_error_handler(err, req, res, next) {
  res.status(err.status || 400).send(err.message || err)
  if (process.env.NODE_ENV !== 'production') {
    console.log('---------------------------------------------------------')
    console.log(err)
    console.log('---------------------------------------------------------')
  }
}
app.use(_general_error_handler)
