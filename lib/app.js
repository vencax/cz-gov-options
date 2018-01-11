const express = require('express')
const cors = require('cors')
const db = require('./db')

// create app
const app = express()

// init CORS
const opts = {
  maxAge: 86400
}
app.use(cors(opts))

app.get('/towns', (req, res, next) => {
  res.json(db.towns())
})

app.get('/ico', (req, res, next) => {
  res.json(db.ico())
})

function _generalErrorHandler (err, req, res, next) {
  res.status(err.status || 400).send(err.message || err)
  if (process.env.NODE_ENV !== 'production') {
    console.log('---------------------------------------------------------')
    console.log(err)
    console.log('---------------------------------------------------------')
  }
}
app.use(_generalErrorHandler)
module.exports = app
