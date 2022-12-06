import express from 'express'
const db = require('./db')

const api = express()

api.get('/towns', (req, res, next) => {
  res.json(db.towns())
})

api.get('/ico', (req, res, next) => {
  res.json(db.ico())
})

api.get('/psc2region', (req, res, next) => {
  res.json(db.psc2region())
})

export default api
