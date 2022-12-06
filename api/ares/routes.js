import express from 'express'
import { get } from './service'

const api = express()

api.get('/:id', async (req, res, next) => {
  try {
    const info = await get(req.params.id)
    res.json(info)
  } catch (err) {
    next(err)
  }
})

export default api
