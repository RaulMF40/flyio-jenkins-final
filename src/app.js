const express = require('express')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World desde DevOps Ejercicio Final Deploy Jenkins!' })
})

app.post('/echo', (req, res) => {
  const { body } = req
  res.status(200).json(body)
})

module.exports = app